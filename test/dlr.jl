using FastGaussQuadrature, Printf
using CompositeGrids
using LinearAlgebra
using Random
include("../src/SDLR/grid.jl")
rtol(x, y) = maximum(abs.(x - y)) # / maximum(abs.(x))

# SemiCircle(dlr, grid, type) = Sample.SemiCircle(dlr.Euv, dlr.β, dlr.isFermi, grid, type, dlr.symmetry, rtol = dlr.rtol, degree = 24, regularized = true)
SemiCircle(dlr, grid, type) = Sample.SemiCircle(dlr, type, grid, degree=24, regularized=true)
function MultiPole(dlr, grid, type, poles, weight)  
    # return Sample.MultiPole(dlr.β, dlr.isFermi, grid, type, poles, dlr.symmetry; regularized = true)
    return Sample.MultiPole(dlr, type, poles, grid, weight; regularized=true)
end
# function MultiPole(dlr, grid, type)
#     Euv = dlr.Euv
#     # dtype = typeof(Euv)
#     # poles = 2.0 * rand(dtype,1) .- 1.0
#     # print(poles)
#     # poles *= Euv

#     poles = [-0.626881264308736*Euv] #, -0.3 * Euv, 0.0, 0.125 * Euv, 0.224Euv]
#     print(poles)
#      # return Sample.MultiPole(dlr.β, dlr.isFermi, grid, type, poles, dlr.symmetry; regularized = true)
#     return Sample.MultiPole(dlr, type, poles, grid; regularized=true)
# end

# function MultiPole(dlr, grid, type, coeff)
#     Euv = dlr.Euv
#     poles = coeff * Euv
#     # return Sample.MultiPole(dlr.β, dlr.isFermi, grid, type, poles, dlr.symmetry; regularized = true)
#     return Sample.MultiPole(dlr, type, poles, grid; regularized=true)
# end


function bare_G(dlr, grid, type)
    T = typeof(dlr.β)
    E = T(1.0)
    if type == :n
        G = zeros(Complex{T}, length(grid))
        for i in 1:length(grid)
            G[i] = Spectral.kernelFermiΩ(grid[i], E, dlr.β)
            #G[i]=Spectral.kernelFermiSymΩ(grid[i], E, dlr.β)

            #print("$(dlr.n[i]),$(G[i])\n")
        end
    elseif type == :τ
        G = zeros(T, length(grid))
        for i in 1:length(grid)
            G[i] = Spectral.kernelFermiT(grid[i], E, dlr.β)
            #G[i]=Spectral.kernelSymT(grid[i], E, dlr.β)
        end
    end
    print("$(typeof(G))\n")
    return G
end
function bare_G_τ(dlr, grid)
    T = typeof(dlr.β)
    E = T(1.0)
    G = zeros(T, length(grid))
    for i in 1:length(grid)
        n = 0
        wn = π / dlr.β
        while n < dlr.n[end]
            G[i] += 2 * real(Spectral.kernelFermiΩ(n, E, dlr.β) * exp(-im * wn * grid[i])) / dlr.β
            #G[i] +=2*real(Spectral.kernelFermiSymΩ(n, E, dlr.β)*exp(-im*wn*grid[i]))/dlr.β            
            n += 1
            wn += 2 * π / dlr.β
        end
        if i == 1
            print("$(typeof(im*wn*grid[1]))\n")
        end
    end
    print("$(typeof(G))\n")
    return G
end

function compare_L2(case, err,  eps, requiredratio, para="")
    ratio = isfinite(err) ? Int(round(err / eps)) : 0
    if ratio > requiredratio
        printstyled("$case, $para err: ", color=:white)
        printstyled("$(round(err, sigdigits=3)) = $ratio x rtol\n", color=:green)
    end
    @test err .< requiredratio * eps # dlr should represent the Green's function up to accuracy of the order eps
end

function compare(case, a, b,  eps, requiredratio, para="")
    err = rtol(a, b)
    ratio = isfinite(err) ? Int(round(err / eps)) : 0
    if ratio > 50
        printstyled("$case, $para err: ", color=:white)
        printstyled("$(round(err, sigdigits=3)) = $ratio x rtol\n", color=:green)
    end
    @test err .< requiredratio * eps # dlr should represent the Green's function up to accuracy of the order eps
end

function compare_atol(case, a, b, atol, para="")
    err = rtol(a, b)
    err = isfinite(err) ? round(err, sigdigits=3) : 0
    if err > 100 * atol
        printstyled("$case, $para err: ", color=:white)
        printstyled("$err = $(Int(round(err/atol))) x atol\n", color=:blue)
    end
    @test rtol(a, b) .< 6000 * atol # dlr should represent the Green's function up to accuracy of the order eps
end

@testset "Operation Utility" begin
    ########## test _matrix_tensor_dot  #################
    # middle
    a = rand(5, 4)
    b = rand(3, 4, 6)
    c = Lehmann._matrix_tensor_dot(a, b, 2)
    @inferred Lehmann._matrix_tensor_dot(a, b, 2)

    @test size(c) == (3, 5, 6)

    _b, psize = Lehmann._tensor2matrix(b, Val(2))
    _c = a * _b
    _c = Lehmann._matrix2tensor(_c, psize, Val(2))

    @test c ≈ _c

    # left
    a = rand(5, 4)
    b = rand(4, 3, 6)
    c = Lehmann._matrix_tensor_dot(a, b, 1)
    @inferred Lehmann._matrix_tensor_dot(a, b, 1)

    @test size(c) == (5, 3, 6)

    _b, psize = Lehmann._tensor2matrix(b, Val(1))
    _c = a * _b
    _c = Lehmann._matrix2tensor(_c, psize, Val(1))

    @test c ≈ _c

    # right
    a = rand(5, 4)
    b = rand(3, 6, 4)
    c = Lehmann._matrix_tensor_dot(a, b, 3)
    @inferred Lehmann._matrix_tensor_dot(a, b, 3)

    @test size(c) == (3, 6, 5)

    _b, psize = Lehmann._tensor2matrix(b, Val(3))
    _c = a * _b
    _c = Lehmann._matrix2tensor(_c, psize, Val(3))

    @test c ≈ _c
end

@testset "Correlator Representation" begin

    function test(case, isFermi, symmetry, Euv, β, eps; dtype=Float64)
        # println("Test $case with isFermi=$isFermi, Symmetry = $symmetry, Euv=$Euv, β=$β, rtol=$eps")
        Random.seed!(8)
        para = "fermi=$isFermi, sym=$symmetry, Euv=$Euv, β=$β, rtol=$eps"
        dlr = DLRGrid(Euv, β, eps, isFermi, symmetry, dtype=dtype) #construct dlr basis
        fine_tau =  fine_τGrid_test(dtype(Euv),64, dtype(1.5))
        fine_n = Int.(uni_ngrid(true, dtype(10*Euv)))
        
      
        error_tolerance = 25
        # if symmetry == :sym
        #     error_tolerance = 3
        # else
        #     error_tolerance = 10
        # end
        #=========================================================================================#
        #                              Imaginary-time Test                                        #
        #=========================================================================================#
        # get imaginary-time Green's function 
        τSample = fine_tau
        nSample = dlr.n
        # else
        # if Euv > 1e5
        #     nSample = dlr.n
        # else
        #     nSample = fine_n
        # end
        if case == MultiPole
            dtype = typeof(dlr.Euv)
            N_poles = 5
            poles = zeros(dtype, (N_poles))
            weight = zeros(dtype, (N_poles))  
            poles[:] = 2.0 * rand(dtype, N_poles) .- 1.0
            weight[:] = rand(dtype, N_poles)
            weight[:] = weight[:] / sum(abs.(weight[:]))
            Euv = dlr.Euv
            #print(poles, weight)
            poles *= Euv
            Gdlr = case(dlr, dlr.τ, :τ, poles, weight)
            Gsample = case(dlr, τSample, :τ, poles, weight)
            Gndlr = case(dlr, dlr.n, :n, poles, weight)
            Gnsample = case(dlr, nSample, :n, poles, weight)
        else
            Gdlr = case(dlr, dlr.τ, :τ)
            Gsample = case(dlr, τSample, :τ)
            Gndlr = case(dlr, dlr.n, :n)
            Gnsample = case(dlr, nSample, :n)
        end

        
        # get imaginary-time Green's function for τ sample 
       
      
        ########################## imaginary-time to dlr #######################################
        coeff = tau2dlr(dlr, Gdlr)
     
        Gfitted = dlr2tau(dlr, coeff, τSample)
        err = sqrt(Interp.integrate1D( (abs.(Gsample -Gfitted)).^2,  τSample))
        #err = maximum(abs.(Gsample-Gfitted))
        #Gfitted = tau2tau(dlr, Gdlr, τSample)
        compare_L2("dlr τ → dlr → generic τ $case", err, eps, error_tolerance, para)
        # for (ti, t) in enumerate(τSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", t / β, Gsample[1, ti],  Gfitted[1, ti], Gsample[1, ti] - Gfitted[1, ti])
        # end
        
        #compare("generic τ → dlr → τ $case", tau2tau(dlr, Gsample, dlr.τ, τSample), Gdlr, eps, error_tolerance, para)
        #=========================================================================================#
        #                            Matsubara-frequency Test                                     #
        #=========================================================================================#
        # get Matsubara-frequency Green's function
        
       
       
       

        # Matsubara frequency to dlr
        coeffn = matfreq2dlr(dlr, Gndlr)
        Gnfitted = dlr2matfreq(dlr, coeffn, nSample)
        #     for (ni, n) in enumerate(nSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", n, real(Gnsample[1, ni]),  real(Gnfitted[1, ni]), abs(Gnsample[1, ni] - Gnfitted[1, ni]))
        # end
        err = norm(Gnsample - Gnfitted)
        #err = maximum(abs.(Gnsample-Gnfitted))
        compare_L2("dlr iω → dlr → generic iω $case ", err, eps, error_tolerance, para)
        #compare("generic iω → dlr → iω $case", matfreq2matfreq(dlr, Gnsample, dlr.n, nSample), Gndlr, eps, error_tolerance, para)

        #=========================================================================================#
        #                            Fourier Transform Test                                     #
        #=========================================================================================#
        Gnfourier = tau2matfreq(dlr, Gdlr, nSample)
        err = norm(Gnsample - Gnfourier)
        #err = maximum(abs.(Gnsample-Gnfourier))
        compare_L2("fourier τ→dlr→iω $case", err, eps, error_tolerance, para)
       

        Gfourier = matfreq2tau(dlr, Gndlr, τSample)
        err = sqrt(Interp.integrate1D( (abs.(Gsample -Gfourier)).^2,  τSample))
        #err = maximum(abs.(Gsample-Gfourier))
        compare_L2("fourier iω→dlr→τ $case", err, eps, error_tolerance, para)
        # for (ti, t) in enumerate(τSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", t / β, Gsample[2, ti],  real(Gfourier[2, ti]), abs(Gsample[2, ti] - Gfourier[2, ti]))
        # end

        #=========================================================================================#
        #                            Noisey data Test                                             #
        #=========================================================================================#

        # err = 10 * eps
        if symmetry != :sym
            atol = eps
            noise = atol * rand(eltype(Gsample), length(Gsample))
            GNoisy = Gsample .+ noise
            #compare_atol("noisy generic τ → dlr → τ $case", tau2tau(dlr, GNoisy, dlr.τ, τSample; error=abs.(noise)), Gdlr, atol, para)

            noise = atol * rand(eltype(Gnsample), length(Gnsample))
            GnNoisy = Gnsample .+ noise
            #compare_atol("noisy generic iω → dlr → iω $case", matfreq2matfreq(dlr, GnNoisy, dlr.n, nSample, error=abs.(noise)), Gndlr, atol, para)
        end
    end
    # the accuracy greatly drops beyond Λ >= 1e8 and rtol<=1e-6
    cases = [SemiCircle, MultiPole]
    #cases = [MultiPole]
    Λ = [1e3, 1e4, 1e5, 1e6]
    rtol =[1e-4, 1e-6, 1e-8, 1e-10, 1e-12]
    for case in cases
        for l in Λ
            for r in rtol
                test(case, true, :none, l, 1.0, r, dtype=Float64)
                test(case, false, :none, l, 1.0, r, dtype=Float64)

                #test(case, false, :ph, l, 1.0, r, dtype=Float64)
                #test(case, true, :ph, l, 1.0, r, dtype=Float64)

                #test(case, false, :pha, l, 1.0, r, dtype=Float64)
                #test(case, true, :pha, l, 1.0, r, dtype=Float64)

                # if case == MultiPole
                #     setprecision(128)
                #     test(case, true, :none, l, 1.0, r, dtype = BigFloat)
                #     test(case, false, :none, l, 1.0, r, dtype= BigFloat)
                #     test(case, true, :sym, l, 1.0, r, dtype = BigFloat)
                #     test(case, false, :sym, l, 1.0, r, dtype = BigFloat)
                #     test(case, false, :ph, l, 1.0, r, dtype = BigFloat)
                #     test(case, true, :ph, l, 1.0, r, dtype=BigFloat)
                #     test(case, false, :pha, l, 1.0, r,dtype=BigFloat)
                #     test(case, true, :pha, l, 1.0, r, dtype= BigFloat)
                # end
            end
        end
    end
    for case in cases
        for l in Λ
            for r in rtol
                test(case, true, :sym, l, 1.0, r, dtype=Float64)
                test(case, false, :sym, l, 1.0, r, dtype=Float64)
                # if case == MultiPole
                #setprecision(128)
                #     test(case, true, :none, l, 1.0, r, dtype = BigFloat)
                #     test(case, false, :none, l, 1.0, r, dtype= BigFloat)
                #test(case, true, :sym, l, 1.0, r, dtype = BigFloat)
                #test(case, false, :sym, l, 1.0, r, dtype = BigFloat)
                #     test(case, false, :ph, l, 1.0, r, dtype = BigFloat)
                #     test(case, true, :ph, l, 1.0, r, dtype=BigFloat)
                #     test(case, false, :pha, l, 1.0, r,dtype=BigFloat)
                #     test(case, true, :pha, l, 1.0, r, dtype= BigFloat)
                # end
            end
        end
    end
end


@testset "Tensor ↔ Matrix Mapping" begin
    a = rand(3)
    acopy = deepcopy(a)
    b, psize = Lehmann._tensor2matrix(a, Val(1))
    anew = Lehmann._matrix2tensor(b, psize, Val(1))
    @test acopy ≈ anew

    a = rand(3, 4)
    acopy = deepcopy(a)
    for axis = 1:2
        b, psize = Lehmann._tensor2matrix(a, Val(axis))
        anew = Lehmann._matrix2tensor(b, psize, Val(axis))
        @test acopy ≈ anew
    end

    a = rand(3, 4, 5)
    acopy = deepcopy(a)
    for axis = 1:3
        b, psize = Lehmann._tensor2matrix(a, Val(axis))
        anew = Lehmann._matrix2tensor(b, psize, Val(axis))
        @test acopy ≈ anew
    end

    #### _tensor2matrix and _matrix2tensor type stability ############
    a = rand(5)
    _a, psize = Lehmann._tensor2matrix(a, Val(1))
    __a = Lehmann._matrix2tensor(_a, psize, Val(1))
    @test a ≈ __a
    @inferred Lehmann._tensor2matrix(a, Val(1))
    @inferred Lehmann._matrix2tensor(_a, psize, Val(1))

    a = rand(3, 4, 5)
    _a, psize = Lehmann._tensor2matrix(a, Val(2))
    __a = Lehmann._matrix2tensor(_a, psize, Val(2))
    @test a ≈ __a
    @inferred Lehmann._tensor2matrix(a, Val(2))
    @inferred Lehmann._matrix2tensor(_a, psize, Val(2))

    _a, psize = Lehmann._tensor2matrix(a, Val(1))
    __a = Lehmann._matrix2tensor(_a, psize, Val(1))
    @test a ≈ __a
    @inferred Lehmann._tensor2matrix(a, Val(1))
    @inferred Lehmann._matrix2tensor(_a, psize, Val(1))

    _a, psize = Lehmann._tensor2matrix(a, Val(3))
    __a = Lehmann._matrix2tensor(_a, psize, Val(3))
    @test a ≈ __a
    @inferred Lehmann._tensor2matrix(a, Val(3))
    @inferred Lehmann._matrix2tensor(_a, psize, Val(3))

end

@testset "Tensor DLR" begin
    Euv, β = 1.0, 1000.0
    eps = 1e-10
    isFermi = true
    symmetry = :none
    # symmetry = :ph
    weight = π / 2 * Euv
    para = "fermi=$isFermi, sym=$symmetry, Euv=$Euv, β=$β, rtol=$eps"
    dlr = DLRGrid(Euv, β, eps, isFermi, symmetry) #construct dlr basis

    Gτ = SemiCircle(dlr, dlr.τ, :τ)
    Gn = SemiCircle(dlr, dlr.n, :n)
    Gτ_copy = deepcopy(Gτ)
    Gn_copy = deepcopy(Gn)

    n1, n2 = 1, 1
    a = rand(n1, n2)
    # a = ones(n1, n2)
    sumrule_τ = zeros(n1, n2)
    sumrule_n = zeros(n1, n2)
    tensorGτ = zeros(eltype(Gτ), (n1, n2, length(Gτ)))
    for (gi, g) in enumerate(Gτ)
        tensorGτ[:, :, gi] = a .* g
        sumrule_τ = a * weight
    end
    tensorGn = zeros(eltype(Gn), (n1, n2, length(Gn)))
    for (gi, g) in enumerate(Gn)
        tensorGn[:, :, gi] = a .* g
        sumrule_n = a * weight
    end
    tensorGτ_copy = tensorGτ
    tensorGn_copy = tensorGn
    err = 
    compare("τ ↔ iω tensor", tau2matfreq(dlr, Gτ_copy), Gn, eps, 1000.0, para)
    @inferred tau2matfreq(dlr, Gτ_copy)
    @test Gτ ≈ Gτ_copy #make sure there is no side effect on G
    compare("iω ↔ τ tensor", matfreq2tau(dlr, Gn_copy), Gτ, eps, 1000.0, para)
    @inferred matfreq2tau(dlr, Gn_copy)
    @test Gn ≈ Gn_copy #make sure there is no side effect on G

    compare("τ ↔ iω tensor", tau2matfreq(dlr, Gτ_copy; sumrule=weight), Gn, eps, 1000.0, para)
    @test Gτ ≈ Gτ_copy #make sure there is no side effect on G
    compare("iω ↔ τ tensor", matfreq2tau(dlr, Gn_copy; sumrule=weight), Gτ, eps, 1000.0, para)
    @test Gn ≈ Gn_copy #make sure there is no side effect on G

    compare("τ ↔ iω tensor", tau2matfreq(dlr, tensorGτ_copy; axis=3), tensorGn, eps, 1000.0, para)
    # println(typeof(tensorGτ_copy))
    # @inferred tau2matfreq(dlr, tensorGτ_copy; axis=3)
    @test tensorGτ ≈ tensorGτ_copy #make sure there is no side effect on G
    compare("iω ↔ τ tensor", matfreq2tau(dlr, tensorGn_copy; axis=3), tensorGτ, eps, 1000.0, para)
    # @inferred matfreq2tau(dlr, tensorGn_copy; axis=3)
    @test tensorGn ≈ tensorGn_copy #make sure there is no side effect on G


    compare("τ ↔ iω tensor", tau2matfreq(dlr, tensorGτ_copy; axis=3, sumrule=sumrule_τ), tensorGn, eps, 1000.0, para)
    # @inferred tau2matfreq(dlr, tensorGτ_copy; axis=3)
    @test tensorGτ ≈ tensorGτ_copy #make sure there is no side effect on G
    compare("iω ↔ τ tensor", matfreq2tau(dlr, tensorGn_copy; axis=3, sumrule=sumrule_n), tensorGτ, eps, 1000.0, para)
    # @inferred matfreq2tau(dlr, tensorGn_copy; axis=3)
    @test tensorGn ≈ tensorGn_copy #make sure there is no side effect on G

    tensor = zeros(128, 128, length(dlr))
    tau2matfreq(dlr, tensor; axis=3)
    coeff = tau2dlr(dlr, tensor; axis=3)
    dlr2matfreq(dlr, coeff; axis=3)

    # @inferred tau2dlr(dlr, tensor; axis=3)
    # @inferred dlr2matfreq(dlr, coeff; axis=3)

    tensor = zeros(128, 128, length(dlr))
    println("tau2matfreq timing:")
    @time tau2matfreq(dlr, tensor; axis=3)
    println("tau2dlr timing:")
    @time coeff = tau2dlr(dlr, tensor; axis=3)
    println("dlr2matfreq timing:")
    @time dlr2matfreq(dlr, coeff; axis=3)

end

@testset "Least square fitting" begin
    Gτ = [6.0, 5.0, 7.0, 10.0]
    kernel = zeros(4, 2)
    kernel[:, 1] = [1.0, 1.0, 1.0, 1.0]
    kernel[:, 2] = [1.0, 2.0, 3.0, 4.0]
    dlrGrid = DLRGrid(β=10.0, isFermi=true)
    coeff = Lehmann._weightedLeastSqureFit(dlrGrid, Gτ, nothing, kernel, nothing)
    @test coeff ≈ [3.5, 1.4]
end

@testset "DLR io" begin
    function finddlr(folder, filename)
        searchdir(path, key) = filter(x -> occursin(key, x), readdir(path))
        file = searchdir(folder, filename)
        if length(file) == 1
            #dlr file found
            println("find dlr file: ", file[1])
            return joinpath(folder, file[1])
        end
        return nothing
    end

    folder = "./"
    Euv, β, rtol = 1.5, 110.0, 4.3e-8

    #save dlr to a local file
    dlr = Lehmann.DLRGrid(Euv, β, rtol, true; rebuild=true, folder=folder, verbose=false)
    file = finddlr(folder, ".dlr")
    @test isnothing(file) == false
    #load dlr from the local file
    dlr_load = Lehmann.DLRGrid(Euv, β, rtol, true; rebuild=false, folder=folder, verbose=false)
    @test dlr_load.τ ≈ dlr.τ
    @test dlr_load.n ≈ dlr.n
    @test dlr_load.ω ≈ dlr.ω
    @test dlr_load.ωn ≈ dlr.ωn
    @test dlr_load.Euv ≈ dlr.Euv
    @test dlr_load.β ≈ dlr.β
    @test dlr_load.rtol ≈ dlr.rtol
    @test dlr_load.Λ ≈ dlr.Λ
    rm(file)
end

@testset "JLD2 IO" begin
    dlr = DLRGrid(isFermi=true, beta=10.0)
    save("test.jld2", Dict("dlr" => dlr), compress=true)
    dlr_new = load("test.jld2")["dlr"]
    println(dlr_new)
    @test dlr.isFermi == dlr_new.isFermi
    @test dlr.Euv ≈ dlr_new.Euv
    @test dlr.β ≈ dlr_new.β
    @test dlr.τ ≈ dlr_new.τ
    @test dlr.n ≈ dlr_new.n
    @test dlr.ωn ≈ dlr_new.ωn
    @test dlr.symmetry == dlr_new.symmetry
    rm("test.jld2")
end
