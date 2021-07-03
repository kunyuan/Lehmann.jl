var documenterSearchIndex = {"docs":
[{"location":"lib/dlr/#Discrete-Lehmann-Representation","page":"Discrete Lehmann Representation","title":"Discrete Lehmann Representation","text":"","category":"section"},{"location":"lib/dlr/","page":"Discrete Lehmann Representation","title":"Discrete Lehmann Representation","text":"Modules = [Lehmann.DLR]","category":"page"},{"location":"lib/dlr/#Lehmann.DLR","page":"Discrete Lehmann Representation","title":"Lehmann.DLR","text":"discrete Lehmann representation for imaginary-time/Matsubara-freqeuncy correlator\n\n\n\n\n\n","category":"module"},{"location":"lib/dlr/#Lehmann.DLR.DLRGrid","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.DLRGrid","text":"struct DLRGrid\n\nDLR grids for imaginary-time/Matsubara frequency correlators\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\nEuv : the UV energy scale of the spectral density \nβ : inverse temeprature\nΛ: cutoff = UV Energy scale of the spectral density * inverse temperature\nrtol: tolerance absolute error\nsize : number of DLR basis\nω : selected representative real-frequency grid\nn : selected representative Matsubara-frequency grid (integer)\nωn : (2n+1)π/β\nτ : selected representative imaginary-time grid\n\n\n\n\n\n","category":"type"},{"location":"lib/dlr/#Lehmann.DLR.barycheb-NTuple{5, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.barycheb","text":"function barycheb(n, x, f, wc, xc)\n\nBarycentric Lagrange interpolation at Chebyshev nodes Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\nx: coordinate to interpolate\nf: array of size n, function at the Chebyshev nodes\nwc: array of size n, Barycentric Lagrange interpolation weights\nxc: array of size n, coordinates of Chebyshev nodes\n\nReturns\n\nInterpolation result\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.barychebinit-Tuple{Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.barychebinit","text":"barychebinit(n)\n\nGet Chebyshev nodes of first kind and corresponding barycentric Lagrange interpolation weights.  Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\n\nReturns\n\nChebyshev nodes\nBarycentric Lagrange interpolation weights\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.dlr-Tuple{Any, Any, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.dlr","text":"function dlr(type, Λ, rtol)     Construct discrete Lehmann representation\n\n#Arguments:\n\ntype: type of kernel, :fermi, :boson\nΛ: cutoff = UV Energy scale of the spectral density * inverse temperature\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.dlr2matfreq","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.dlr2matfreq","text":"function dlr2matfreq(type, dlrcoeff, dlrGrid::DLRGrid, nGrid, β=1.0; axis=1)\n\nDLR representation to Matsubara-frequency representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ndlrcoeff : DLR coefficients\ndlrGrid : DLRGrid\nnGrid : expected fine Matsubara-freqeuncy grids (integer)\naxis: Matsubara-frequency axis in the data dlrcoeff\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.DLR.dlr2tau-Tuple{Any, Any, Lehmann.DLR.DLRGrid, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.dlr2tau","text":"function dlr2tau(type, dlrcoeff, dlrGrid::DLRGrid, τGrid; axis=1)\n\nDLR representation to imaginary-time representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ndlrcoeff : DLR coefficients\ndlrGrid : DLRGrid\nτGrid : expected fine imaginary-time grids ∈ (0, β]\naxis: imaginary-time axis in the data dlrcoeff\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.kernalDiscretization-NTuple{5, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.kernalDiscretization","text":"kernalDiscretization(type, Nτ, Nω, Λ, rtol)\n\nDiscretize kernel K(tau,omega) on composite Chebyshev fine grids for τ and ω.  Generate a panels and grids for τ and ω.\n\n#Arguments:\n\ntype: :fermi, :bose or :corr\nDτ: Chebyshev degree in each τ panel\nDω: Chebyshev degree in each ω panel\nΛ: cutoff = UV Energy scale of the spectral density * inverse temperature\nrtol: tolerance relative error\n\n#Returns\n\nτPanel: panel break points for τ, exponentially get dense near 0⁺ and 1⁻\nωPanel: panel break points for ω, get exponentially dense near 0⁻ and 0⁺\nτGrid: tau fine grid points on (0,1)\nωGrid: omega fine grid points on (-Λ, Λ)\nkernel: K(tau,omega) on fine grid \nerr: Error of composite Chebyshev interpolant of K(tau,omega). err(1) is ~= max relative L^inf error in tau over all omega in fine grid. err(2) is ~= max L^inf error in omega over all tau in fine grid.\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.matfreq2dlr-Tuple{Any, Any, Lehmann.DLR.DLRGrid}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.matfreq2dlr","text":"function matfreq2dlr(type, green, dlrGrid::DLRGrid; axis=1, rtol=1e-12)\n\nMatsubara-frequency representation to DLR representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ngreen : green's function in Matsubara-frequency domain\naxis: the Matsubara-frequency axis in the data green\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.matfreq2tau-NTuple{4, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.matfreq2tau","text":"function matfreq2tau(type, green, dlrGrid, τGrid; axis=1, rtol=1e-12)\n\nFourier transform from Matsubara-frequency to imaginary-time using the DLR representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ngreen : green's function in Matsubara-freqeuncy repsentation\ndlrGrid : DLRGrid\nτGrid : expected fine imaginary-time grids\naxis: Matsubara-frequency axis in the data green\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.tau2dlr-Tuple{Any, Any, Lehmann.DLR.DLRGrid}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.tau2dlr","text":"function tau2dlr(type, green, dlrGrid::DLRGrid; axis=1, rtol=1e-12)\n\nimaginary-time domain to DLR representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ngreen : green's function in imaginary-time domain\naxis: the imaginary-time axis in the data green\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.DLR.tau2matfreq-NTuple{4, Any}","page":"Discrete Lehmann Representation","title":"Lehmann.DLR.tau2matfreq","text":"function tau2matfreq(type, green, dlrGrid, nGrid; axis=1, rtol=1e-12)\n\nFourier transform from imaginary-time to Matsubara-frequency using the DLR representation\n\n#Members:\n\ntype: symbol :fermi, :corr, :acorr\ngreen : green's function in imaginary-time domain\ndlrGrid : DLRGrid\nnGrid : expected fine Matsubara-freqeuncy grids (integer)\naxis: the imaginary-time axis in the data green\nrtol: tolerance absolute error\n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Spectral-functions","page":"Spectral functions","title":"Spectral functions","text":"","category":"section"},{"location":"lib/spectral/","page":"Spectral functions","title":"Spectral functions","text":"Modules = [Lehmann.Spectral]","category":"page"},{"location":"lib/spectral/#Lehmann.Spectral","page":"Spectral functions","title":"Lehmann.Spectral","text":"Spectral representation related functions\n\n\n\n\n\n","category":"module"},{"location":"lib/spectral/#Lehmann.Spectral.boseEinstein-Union{Tuple{T}, Tuple{T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.boseEinstein","text":"boseEinstein(ω)\n\nCompute the Fermi Dirac function. Assume k_B Thbar=1\n\nf(ω) = 1(e^ωβ-1)\n\nArguments\n\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.density-Union{Tuple{T}, Tuple{Symbol, T}, Tuple{Symbol, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.density","text":"density(type, ω, β=1.0)\n\nCompute the imaginary-time kernel of different type. Assume k_B Thbar=1\n\nArguments\n\ntype: symbol :fermi, :bose\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.fermiDirac-Union{Tuple{T}, Tuple{T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.fermiDirac","text":"fermiDirac(ω)\n\nCompute the Fermi Dirac function. Assume k_B Thbar=1\n\nf(ω) = 1(e^ωβ+1)\n\nArguments\n\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelAnormalCorrT-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelAnormalCorrT","text":"kernelAnormalCorrT(τ, ω, β=1.0)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ-e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (0, β]\nω: frequency, ω>=0\nβ = 1.0: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelAnormalCorrΩ-Union{Tuple{T}, Tuple{Int64, T}, Tuple{Int64, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelAnormalCorrΩ","text":"kernelAnormalCorrΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a anormalous fermionic correlator with particle-hole symmetry.\n\nK(iω_n) = frac2ωω^2+ω_n^2(1+e^-ωβ)\n\nwhere ω_n=(2n+1)πβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the fermionic Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseT-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseT","text":"kernelBoseT(τ, ω, β=1.0)\n\nCompute the imaginary-time bosonic kernel. Machine accuracy ~eps(g) is guaranteed``\n\ng(τ0) = e^-ωτ(1-e^-ωβ) g(τ0) = -e^-ωτ(1-e^ωβ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ = 1.0: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseΩ-Union{Tuple{T}, Tuple{Int64, T}, Tuple{Int64, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseΩ","text":"kernelBoseΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the bosonic kernel with Matsubara frequency.\n\ng(iω_n) = -1(iω_n-ω)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelCorrT-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelCorrT","text":"kernelCorrT(τ, ω, β=1.0)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ+e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency, ω>=0\nβ = 1.0: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelCorrΩ-Union{Tuple{T}, Tuple{Int64, T}, Tuple{Int64, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelCorrΩ","text":"kernelCorrΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a correlator O(τ)O(0)_iω_n.\n\nK(iω_n) = frac2ωω^2+ω_n^2(1-e^-ωβ)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiT-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiT","text":"kernelFermiT(τ, ω, β=1.0)\n\nCompute the imaginary-time fermionic kernel.  Machine accuracy ~eps(g) is guaranteed``\n\ng(τ0) = e^-ωτ(1+e^-ωβ) g(τ0) = -e^-ωτ(1+e^ωβ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ = 1.0: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiΩ-Union{Tuple{T}, Tuple{Int64, T}, Tuple{Int64, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiΩ","text":"kernelFermiΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the fermionic kernel with Matsubara frequency.\n\ng(iω_n) = -1(iω_n-ω)\n\nwhere ω_n=(2n+1)πβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelT-Union{Tuple{T}, Tuple{Symbol, AbstractVector{T}, AbstractVector{T}}, Tuple{Symbol, AbstractVector{T}, AbstractVector{T}, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelT","text":"kernelT(type::Symbol, τGrid::Vector{T}, ωGrid::Vector{T}, β::T=1.0) where {T<:AbstractFloat}\n\nCompute kernel with given τ and ω grids.\n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelT-Union{Tuple{T}, Tuple{Symbol, T, T}, Tuple{Symbol, T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelT","text":"kernelT(type, τ, ω, β=1.0)\n\nCompute the imaginary-time kernel of different type.\n\nArguments\n\ntype: symbol :fermi, :bose, :corr\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ = 1.0: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelΩ-Union{Tuple{T}, Tuple{Symbol, Int64, T}, Tuple{Symbol, Int64, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelΩ","text":"kernelΩ(type, n, ω, β=1.0)\n\nCompute the imaginary-time kernel of different type. Assume k_B Thbar=1\n\nArguments\n\ntype: symbol :fermi, :bose, :corr\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelΩ-Union{Tuple{T}, Tuple{Symbol, Vector{Int64}, Vector{T}}, Tuple{Symbol, Vector{Int64}, Vector{T}, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelΩ","text":"kernelΩ(type::Symbol, nGrid::Vector{Int}, ωGrid::Vector{T}, β::T=1.0) where {T<:AbstractFloat}\n\nCompute kernel matrix with given ωn (integer!) and ω grids.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Lehmann","category":"page"},{"location":"#Lehmann","page":"Home","title":"Lehmann","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for Lehmann.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"lib/spectral.md\",\n    \"lib/dlr.md\",\n]\nDepth = 1","category":"page"}]
}
