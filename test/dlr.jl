using FastGaussQuadrature, Printf
include("case.jl")

rtol(x, y) = maximum(abs.(x - y)) / maximum(abs.(x))

function compare(case, a, b, eps, requiredratio, para = "")
    err = rtol(a, b)
    ratio = isfinite(err) ? Int(round(err / eps)) : 0
    if ratio > 50
        printstyled("$case, $para err: ", color = :white)
        printstyled("$(round(err, sigdigits=3)) = $ratio x rtol\n", color = :green)
    end
    @test rtol(a, b) .< requiredratio * eps # dlr should represent the Green's function up to accuracy of the order eps
end

@testset "Correlator Representation" begin

    function test(case, isFermi, symmetry, Euv, β, eps)
        # println("Test $case with isFermi=$isFermi, Symmetry = $symmetry, Euv=$Euv, β=$β, rtol=$eps")

        para = "fermi=$isFermi, sym=$symmetry, Euv=$Euv, β=$β, rtol=$eps"

        dlr = DLRGrid(Euv, β, eps, isFermi; symmetry = symmetry) #construct dlr basis
        dlr10 = DLRGrid(10Euv, β, eps, isFermi; symmetry = symmetry) #construct denser dlr basis for benchmark purpose

        #=========================================================================================#
        #                              Imaginary-time Test                                        #
        #=========================================================================================#
        ################### get imaginary-time Green's function ##########################
        Gdlr, error = case(isFermi, symmetry, dlr.τ, β, Euv)
        @assert maximum(error) < eps

        ############# get imaginary-time Green's function for τ sample ###################
        τSample = dlr10.τ
        Gsample, error = case(isFermi, symmetry, τSample, β, Euv)
        @assert maximum(error) < eps

        ########################## imaginary-time to dlr #######################################
        coeff = tau2dlr(dlr, Gdlr)
        Gfitted = dlr2tau(dlr, coeff, τSample)
        compare("τ→dlr→τ $case", Gsample, Gfitted, eps, 100, para)
        # for (ti, t) in enumerate(τSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", t / β, Gsample[1, ti],  Gfitted[1, ti], Gsample[1, ti] - Gfitted[1, ti])
        # end
        #=========================================================================================#
        #                            Matsubara-frequency Test                                     #
        #=========================================================================================#
        # #get Matsubara-frequency Green's function
        Gndlr, error = case(isFermi, symmetry, dlr.n, β, Euv, IsMatFreq = true)
        @assert maximum(error) < eps

        nSample = dlr10.n
        Gnsample, error = case(isFermi, symmetry, nSample, β, Euv, IsMatFreq = true)
        @assert maximum(error) < eps

        # #Matsubara frequency to dlr
        coeffn = matfreq2dlr(dlr, Gndlr)
        Gnfitted = dlr2matfreq(dlr, coeffn, nSample)
        #     for (ni, n) in enumerate(nSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", n, real(Gnsample[1, ni]),  real(Gnfitted[1, ni]), abs(Gnsample[1, ni] - Gnfitted[1, ni]))
        # end

        compare("iω→dlr→iω $case ", Gnsample, Gnfitted, eps, 100, para)

        #=========================================================================================#
        #                            Fourier Transform Test                                     #
        #=========================================================================================#
        Gnfourier = tau2matfreq(dlr, Gdlr, nSample)
        compare("τ→dlr→iω $case", Gnsample, Gnfourier, eps, 1000, para)
        # for (ti, t) in enumerate(nSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", t / β, imag(Gnsample[2, ti]), imag(Gnfourier[2, ti]), abs(Gnsample[2, ti] - Gnfourier[2, ti]))
        # end

        Gfourier = matfreq2tau(dlr, Gndlr, τSample)
        compare("iω→dlr→τ $case", Gsample, Gfourier, eps, 1000, para)
        # for (ti, t) in enumerate(τSample)
        #     @printf("%32.19g    %32.19g   %32.19g   %32.19g\n", t / β, Gsample[2, ti],  real(Gfourier[2, ti]), abs(Gsample[2, ti] - Gfourier[2, ti]))
        # end
    end

    # the accuracy greatly drops beyond Λ >= 1e8 and rtol<=1e-6
    cases = [SemiCircle, MultiPole]
    Λ = [1e3, 1e5, 1e7]
    rtol = [1e-8, 1e-10, 1e-12]
    for case in cases
        for l in Λ
            for r in rtol
                test(case, true, :none, 1.0, l, r)
                test(case, false, :ph, 1.0, l, r)
                test(case, true, :ph, 1.0, l, r)
                test(case, false, :pha, 1.0, l, r)
                test(case, true, :pha, 1.0, l, r)
            end
        end
    end

end

@testset "Tensor ↔ Matrix Mapping" begin
    a = rand(3)
    acopy = deepcopy(a)
    b, psize = Lehmann._tensor2matrix(a, 1)
    anew = Lehmann._matrix2tensor(b, psize, 1)
    @test acopy ≈ anew

    a = rand(3, 4)
    acopy = deepcopy(a)
    for axis = 1:2
        b, psize = Lehmann._tensor2matrix(a, axis)
        anew = Lehmann._matrix2tensor(b, psize, axis)
        @test acopy ≈ anew
    end

    a = rand(3, 4, 5)
    acopy = deepcopy(a)
    for axis = 1:3
        b, psize = Lehmann._tensor2matrix(a, axis)
        anew = Lehmann._matrix2tensor(b, psize, axis)
        @test acopy ≈ anew
    end
end

@testset "Tensor DLR" begin
    Euv, β = 1000.0, 10.0
    eps = 1e-10
    isFermi = true
    symmetry = :none
    para = "fermi=$isFermi, sym=$symmetry, Euv=$Euv, β=$β, rtol=$eps"
    dlr = DLRGrid(Euv, β, eps, isFermi; symmetry = symmetry) #construct dlr basis

    Gτ, error = SemiCircle(isFermi, symmetry, dlr.τ, β, Euv, IsMatFreq = false)
    @assert maximum(error) < eps
    Gn, error = SemiCircle(isFermi, symmetry, dlr.n, β, Euv, IsMatFreq = true)
    @assert maximum(error) < eps

    n1, n2 = 3, 4
    a = rand(n1, n2)
    tensorGτ = zeros(eltype(Gτ), (n1, n2, length(Gτ)))
    for (gi, g) in enumerate(Gτ)
        tensorGτ[:, :, gi] = a .* g
    end
    tensorGn = zeros(eltype(Gn), (n1, n2, length(Gn)))
    for (gi, g) in enumerate(Gn)
        tensorGn[:, :, gi] = a .* g
    end

    compare("τ ↔ iω tensor", tau2matfreq(dlr, tensorGτ; axis = 3), tensorGn, eps, 1000.0, para)
    compare("τ ↔ iω tensor", matfreq2tau(dlr, tensorGn; axis = 3), tensorGτ, eps, 1000.0, para)
end