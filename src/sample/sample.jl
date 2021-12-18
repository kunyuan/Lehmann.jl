module Sample
using FastGaussQuadrature
using ..Spectral
"""
    SemiCircle(Euv, β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, rtol = nothing, degree = 24, regularized::Bool = true)

Generate Green's function from a semicircle spectral density. 
Return the function on Grid and the systematic error.

#Arguments
- `Euv` : ultraviolet energy cutoff
- `β` : inverse temperature
- `isFermi`: is fermionic or bosonic
- `symmetry`: particle-hole symmetric :ph, particle-hole antisymmetric :pha, or :none
- `Grid`: grid to evalute on
- `type`: imaginary-time with :τ, or Matsubara-frequency with :ωn
- `rtol`: accuracy to achieve
- `degree`: polynomial degree for integral
- `regularized`: use regularized bosonic kernel if symmetry = :none
"""
function SemiCircle(Euv, β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, rtol = nothing, degree = 24, regularized::Bool = true)
    # calculate Green's function defined by the spectral density
    # S(ω) = sqrt(1 - (ω / Euv)^2) / Euv # semicircle -1<ω<1
    if type == :τ
        IsMatFreq = false
    elseif type == :ωn
        IsMatFreq = true
    else
        error("not implemented!")
    end

    ##### Panels endpoints for composite quadrature rule ###
    npo = Int(ceil(log(β * Euv) / log(2.0)))
    pbp = zeros(Float64, 2npo + 1)
    pbp[npo+1] = 0.0
    for i = 1:npo
        pbp[npo+i+1] = 1.0 / 2^(npo - i)
    end
    pbp[1:npo] = -pbp[2npo+1:-1:npo+2]

    function Green(n, IsMatFreq)
        #n: polynomial order
        xl, wl = gausslegendre(n)
        xj, wj = gaussjacobi(n, 1 / 2, 0.0)

        G = IsMatFreq ? zeros(ComplexF64, length(Grid)) : zeros(Float64, length(Grid))
        err = zeros(Float64, length(Grid))
        for (τi, τ) in enumerate(Grid)
            for ii = 2:2npo-1
                a, b = pbp[ii], pbp[ii+1]
                for jj = 1:n
                    x = (a + b) / 2 + (b - a) / 2 * xl[jj]
                    if (symmetry == :ph || symmetry == :pha) && x < 0.0
                        #spectral density is defined for positivie frequency only for correlation functions
                        continue
                    end
                    ker = IsMatFreq ? Spectral.kernelΩ(isFermi, symmetry, τ, Euv * x, β, regularized) : Spectral.kernelT(isFermi, symmetry, τ, Euv * x, β, regularized)
                    G[τi] += (b - a) / 2 * wl[jj] * ker * sqrt(1 - x^2)
                end
            end

            a, b = 1.0 / 2, 1.0
            for jj = 1:n
                x = (a + b) / 2 + (b - a) / 2 * xj[jj]
                ker = IsMatFreq ? Spectral.kernelΩ(isFermi, symmetry, τ, Euv * x, β, regularized) : Spectral.kernelT(isFermi, symmetry, τ, Euv * x, β, regularized)
                G[τi] += ((b - a) / 2)^1.5 * wj[jj] * ker * sqrt(1 + x)
            end

            if symmetry != :ph && symmetry != :pha
                #spectral density is defined for positivie frequency only for correlation functions
                a, b = -1.0, -1.0 / 2
                for jj = 1:n
                    x = (a + b) / 2 + (b - a) / 2 * (-xj[n-jj+1])
                    ker = IsMatFreq ? Spectral.kernelΩ(isFermi, symmetry, τ, Euv * x, β, regularized) : Spectral.kernelT(isFermi, symmetry, τ, Euv * x, β, regularized)
                    G[τi] += ((b - a) / 2)^1.5 * wj[n-jj+1] * ker * sqrt(1 - x)
                end
            end
        end
        return G
    end

    g1 = Green(degree, IsMatFreq)
    if isnothing(rtol) == false
        g2 = Green(degree * 2, IsMatFreq)
        err = abs.(g1 - g2)
        @assert maximum(err) < rtol "Systematic error $(maximum(err)) is larger than $rtol, increase degree for the integral!"
    end
    return g1
end

"""
    MultiPole(β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, poles, regularized::Bool = true)

Generate Green's function from a spectral density with delta peaks specified by the argument ``poles``. 
Return the function on Grid and the systematic error.

#Arguments
- `β` : inverse temperature
- `isFermi`: is fermionic or bosonic
- `symmetry`: particle-hole symmetric :ph, particle-hole antisymmetric :pha, or :none
- `Grid`: grid to evalute on
- `type`: imaginary-time with :τ, or Matsubara-frequency with :ωn
- `poles`: a list of frequencies for the delta functions
- `regularized`: use regularized bosonic kernel if symmetry = :none
"""
function MultiPole(β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, poles, regularized::Bool = true)
    # poles = [-Euv, -0.2 * Euv, 0.0, 0.8 * Euv, Euv]
    # poles=[0.8Euv, 1.0Euv]
    # poles = [0.0]
    if type == :τ
        IsMatFreq = false
    elseif type == :ωn
        IsMatFreq = true
    else
        error("not implemented!")
    end

    g = IsMatFreq ? zeros(ComplexF64, length(Grid)) : zeros(Float64, length(Grid))
    for (τi, τ) in enumerate(Grid)
        for ω in poles

            if (symmetry == :ph || symmetry == :pha) && ω < 0.0
                #spectral density is not defined for negative frequency
                continue
            end

            if IsMatFreq == false
                g[τi] += Spectral.kernelT(isFermi, symmetry, τ, ω, β, regularized)
            else
                g[τi] += Spectral.kernelΩ(isFermi, symmetry, τ, ω, β, regularized)
            end
        end
    end
    return g
end

end