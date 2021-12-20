var documenterSearchIndex = {"docs":
[{"location":"lib/utility/#Utility","page":"Utility","title":"Utility","text":"","category":"section"},{"location":"lib/utility/","page":"Utility","title":"Utility","text":"This module provides the utility subroutines for other DLR modules.","category":"page"},{"location":"lib/utility/","page":"Utility","title":"Utility","text":"Modules = [Lehmann.Interp]","category":"page"},{"location":"lib/utility/#Lehmann.Interp.barycheb-NTuple{5, Any}","page":"Utility","title":"Lehmann.Interp.barycheb","text":"function barycheb(n, x, f, wc, xc)\n\nBarycentric Lagrange interpolation at Chebyshev nodes Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\nx: coordinate to interpolate\nf: array of size n, function at the Chebyshev nodes\nwc: array of size n, Barycentric Lagrange interpolation weights\nxc: array of size n, coordinates of Chebyshev nodes\n\nReturns\n\nInterpolation result\n\n\n\n\n\n","category":"method"},{"location":"lib/utility/#Lehmann.Interp.barychebinit-Tuple{Any}","page":"Utility","title":"Lehmann.Interp.barychebinit","text":"barychebinit(n)\n\nGet Chebyshev nodes of first kind and corresponding barycentric Lagrange interpolation weights.  Reference: Berrut, J.P. and Trefethen, L.N., 2004. Barycentric lagrange interpolation. SIAM review, 46(3), pp.501-517.\n\nArguments\n\nn: order of the Chebyshev interpolation\n\nReturns\n\nChebyshev nodes\nBarycentric Lagrange interpolation weights\n\n\n\n\n\n","category":"method"},{"location":"lib/discrete/#Discrete-DLR-builder","page":"Discrete DLR builder","title":"Discrete DLR builder","text":"","category":"section"},{"location":"lib/discrete/","page":"Discrete DLR builder","title":"Discrete DLR builder","text":"This module provides a DLR builder based on the conventional QR algorithm. ","category":"page"},{"location":"lib/discrete/","page":"Discrete DLR builder","title":"Discrete DLR builder","text":"Modules = [Lehmann.Discrete]","category":"page"},{"location":"lib/discrete/#Lehmann.Discrete.build","page":"Discrete DLR builder","title":"Lehmann.Discrete.build","text":"function build(dlrGrid, print::Bool = true)     Construct discrete Lehmann representation\n\n#Arguments:\n\ndlrGrid: struct that contains the information to construct the DLR grid. The following entries are required:  Λ: the dimensionless scale β*Euv, rtol: the required relative accuracy, isFermi: fermionic or bosonic, symmetry: particle-hole symmetry/antisymmetry or none\nprint: print the internal information or not\n\n\n\n\n\n","category":"function"},{"location":"lib/discrete/#Lehmann.Discrete.preciseKernelT","page":"Discrete DLR builder","title":"Lehmann.Discrete.preciseKernelT","text":"function preciseKernelT(dlrGrid, τ, ω, print::Bool = true)\n\nCalculate the kernel matrix(τ, ω) for given τ, ω grids\n\nArguments\n\nτ: a CompositeChebyshevGrid struct or a simple one-dimensional array\nω: a CompositeChebyshevGrid struct or a simple one-dimensional array\nprint: print information or not\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Main-Module","page":"Main Module","title":"Main Module","text":"","category":"section"},{"location":"lib/dlr/","page":"Main Module","title":"Main Module","text":"Modules = [Lehmann]","category":"page"},{"location":"lib/dlr/#Lehmann.DLRGrid","page":"Main Module","title":"Lehmann.DLRGrid","text":"struct DLRGrid\n\nDLR grids for imaginary-time/Matsubara frequency correlators\n\n#Members:\n\nisFermi: bool is fermionic or bosonic\nsymmetry: particle-hole symmetric :ph, or particle-hole asymmetric :pha, or :none\nEuv : the UV energy scale of the spectral density \nβ : inverse temeprature\nΛ: cutoff = UV Energy scale of the spectral density * inverse temperature\nrtol: tolerance absolute error\nsize : number of DLR basis\nω : selected representative real-frequency grid\nn : selected representative Matsubara-frequency grid (integer)\nωn : (2n+1)π/β\nτ : selected representative imaginary-time grid\n\n\n\n\n\n","category":"type"},{"location":"lib/dlr/#Base.size-Tuple{DLRGrid}","page":"Main Module","title":"Base.size","text":"Base.size(dlrGrid::DLRGrid) = length(dlrGrid.ω) Base.length(dlrGrid::DLRGrid) = length(dlrGrid.ω) rank(dlrGrid::DLRGrid) = length(dlrGrid.ω)\n\nget the rank of the DLR grid, namely the number of the DLR coefficients.\n\n\n\n\n\n","category":"method"},{"location":"lib/dlr/#Lehmann.dlr2matfreq","page":"Main Module","title":"Lehmann.dlr2matfreq","text":"function dlr2matfreq(dlrGrid::DLRGrid, dlrcoeff, nGrid = dlrGrid.n; axis = 1)\n\nDLR representation to Matsubara-frequency representation\n\n#Members:\n\ndlrGrid : DLRGrid\ndlrcoeff : DLR coefficients\nnGrid : expected fine Matsubara-freqeuncy grids (integer)\naxis: Matsubara-frequency axis in the data dlrcoeff\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.dlr2tau","page":"Main Module","title":"Lehmann.dlr2tau","text":"function dlr2tau(dlrGrid::DLRGrid, dlrcoeff, τGrid = dlrGrid.τ; axis = 1)\n\nDLR representation to imaginary-time representation\n\n#Members:\n\ndlrGrid : DLRGrid\ndlrcoeff : DLR coefficients\nτGrid : expected fine imaginary-time grids \naxis: imaginary-time axis in the data dlrcoeff\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.matfreq2dlr","page":"Main Module","title":"Lehmann.matfreq2dlr","text":"function matfreq2dlr(dlrGrid::DLRGrid, green, nGrid = dlrGrid.n; error = nothing, axis = 1)\n\nMatsubara-frequency representation to DLR representation\n\n#Members:\n\ndlrGrid: DLRGrid struct.\ngreen : green's function in Matsubara-frequency domain\nnGrid : the n grid that Green's function is defined on. \nerror : error the Green's function. \naxis: the Matsubara-frequency axis in the data green\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.matfreq2matfreq","page":"Main Module","title":"Lehmann.matfreq2matfreq","text":"function matfreq2matfreq(dlrGrid, green, nNewGrid, nGrid = dlrGrid.n; error = nothing, axis = 1)\n\nFourier transform from Matsubara-frequency to imaginary-time using the DLR representation\n\n#Members:\n\ndlrGrid : DLRGrid\ngreen : green's function in Matsubara-freqeuncy repsentation\nnNewGrid : expected fine Matsubara-freqeuncy grids (integer)\nnGrid : the n grid that Green's function is defined on. \nerror : error the Green's function. \naxis: Matsubara-frequency axis in the data green\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.matfreq2tau","page":"Main Module","title":"Lehmann.matfreq2tau","text":"function matfreq2tau(dlrGrid, green, τNewGrid = dlrGrid.τ, nGrid = dlrGrid.n; error = nothing, axis = 1)\n\nFourier transform from Matsubara-frequency to imaginary-time using the DLR representation\n\n#Members:\n\ndlrGrid : DLRGrid\ngreen : green's function in Matsubara-freqeuncy repsentation\nτNewGrid : expected fine imaginary-time grids\nnGrid : the n grid that Green's function is defined on. \nerror : error the Green's function. \naxis: Matsubara-frequency axis in the data green\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.tau2dlr","page":"Main Module","title":"Lehmann.tau2dlr","text":"function tau2dlr(dlrGrid::DLRGrid, green, τGrid = dlrGrid.τ; error = nothing, axis = 1)\n\nimaginary-time domain to DLR representation\n\n#Members:\n\ndlrGrid: DLRGrid struct.\ngreen : green's function in imaginary-time domain.\nτGrid : the imaginary-time grid that Green's function is defined on. \nerror : error the Green's function. \naxis: the imaginary-time axis in the data green.\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.tau2matfreq","page":"Main Module","title":"Lehmann.tau2matfreq","text":"function tau2matfreq(dlrGrid, green, nNewGrid = dlrGrid.n, τGrid = dlrGrid.τ; error = nothing, axis = 1)\n\nFourier transform from imaginary-time to Matsubara-frequency using the DLR representation\n\n#Members:\n\ndlrGrid : DLRGrid\ngreen : green's function in imaginary-time domain\nnNewGrid : expected fine Matsubara-freqeuncy grids (integer)\nτGrid : the imaginary-time grid that Green's function is defined on. \nerror : error the Green's function. \naxis: the imaginary-time axis in the data green\n\n\n\n\n\n","category":"function"},{"location":"lib/dlr/#Lehmann.tau2tau","page":"Main Module","title":"Lehmann.tau2tau","text":"function tau2tau(dlrGrid, green, τNewGrid, τGrid = dlrGrid.τ; weight = nothing, axis = 1)\n\nInterpolation from the old imaginary-time grid to a new grid using the DLR representation\n\n#Members:\n\ndlrGrid : DLRGrid\ngreen : green's function in imaginary-time domain\nτNewGrid : expected fine imaginary-time grids\nτGrid : the imaginary-time grid that Green's function is defined on. \nerror : error the Green's function. \naxis: the imaginary-time axis in the data green\n\n\n\n\n\n","category":"function"},{"location":"lib/sample/#Sample-Green's-Function-Builder","page":"Sample Green's Function Builder","title":"Sample Green's Function Builder","text":"","category":"section"},{"location":"lib/sample/","page":"Sample Green's Function Builder","title":"Sample Green's Function Builder","text":"This module provides subroutines to generate Green's function samples. ","category":"page"},{"location":"lib/sample/","page":"Sample Green's Function Builder","title":"Sample Green's Function Builder","text":"Modules = [Lehmann.Sample]","category":"page"},{"location":"lib/sample/#Lehmann.Sample.MultiPole","page":"Sample Green's Function Builder","title":"Lehmann.Sample.MultiPole","text":"MultiPole(β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, poles, regularized::Bool = true)\n\nGenerate Green's function from a spectral density with delta peaks specified by the argument poles.  Return the function on Grid and the systematic error.\n\n#Arguments\n\nβ : inverse temperature\nisFermi: is fermionic or bosonic\nsymmetry: particle-hole symmetric :ph, particle-hole antisymmetric :pha, or :none\nGrid: grid to evalute on\ntype: imaginary-time with :τ, or Matsubara-frequency with :ωn\npoles: a list of frequencies for the delta functions\nregularized: use regularized bosonic kernel if symmetry = :none\n\n\n\n\n\n","category":"function"},{"location":"lib/sample/#Lehmann.Sample.SemiCircle","page":"Sample Green's Function Builder","title":"Lehmann.Sample.SemiCircle","text":"SemiCircle(Euv, β, isFermi::Bool, symmetry::Symbol, Grid, type::Symbol, rtol = nothing, degree = 24, regularized::Bool = true)\n\nGenerate Green's function from a semicircle spectral density.  Return the function on Grid and the systematic error.\n\n#Arguments\n\nEuv : ultraviolet energy cutoff\nβ : inverse temperature\nisFermi: is fermionic or bosonic\nsymmetry: particle-hole symmetric :ph, particle-hole antisymmetric :pha, or :none\nGrid: grid to evalute on\ntype: imaginary-time with :τ, or Matsubara-frequency with :ωn\nrtol: accuracy to achieve\ndegree: polynomial degree for integral\nregularized: use regularized bosonic kernel if symmetry = :none\n\n\n\n\n\n","category":"function"},{"location":"lib/spectral/#Spectral-functions","page":"Spectral functions","title":"Spectral functions","text":"","category":"section"},{"location":"lib/spectral/","page":"Spectral functions","title":"Spectral functions","text":"This module defines the kernels of Lehmann representation for different particles and symmetries.","category":"page"},{"location":"lib/spectral/","page":"Spectral functions","title":"Spectral functions","text":"Modules = [Lehmann.Spectral]","category":"page"},{"location":"lib/spectral/#Lehmann.Spectral","page":"Spectral functions","title":"Lehmann.Spectral","text":"Spectral representation related functions\n\n\n\n\n\n","category":"module"},{"location":"lib/spectral/#Lehmann.Spectral.boseEinstein-Union{Tuple{T}, Tuple{T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.boseEinstein","text":"boseEinstein(ω)\n\nCompute the Fermi Dirac function. Assume k_B Thbar=1\n\nf(ω) = 1(e^ωβ-1)\n\nArguments\n\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.density-Union{Tuple{T}, Tuple{Bool, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.density","text":"density(isFermi::Bool, ω, β)\n\nCompute the imaginary-time kernel of different type. Assume k_B Thbar=1\n\nArguments\n\nisFermi: fermionic or bosonic\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.fermiDirac-Union{Tuple{T}, Tuple{T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.fermiDirac","text":"fermiDirac(ω)\n\nCompute the Fermi Dirac function. Assume k_B Thbar=1\n\nf(ω) = 1(e^ωβ+1)\n\nArguments\n\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseT-Union{Tuple{T}, Tuple{T, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseT","text":"kernelBoseT(τ, ω, β)\n\nCompute the imaginary-time bosonic kernel. Machine accuracy ~eps(g) is guaranteed``\n\ng(τ0) = e^-ωτ(1-e^-ωβ) g(τ0) = -e^-ωτ(1-e^ωβ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseT_PH-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseT_PH","text":"kernelBoseT_PH(τ, ω, β)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ+e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency, ω>=0\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseT_PHA-Union{Tuple{T}, Tuple{T, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseT_PHA","text":"kernelBoseT_PHA(τ, ω, β)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ-e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (0, β]\nω: frequency, ω>=0\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseT_regular-Union{Tuple{T}, Tuple{T, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseT_regular","text":"kernelBoseT_regular(τ, ω, β)\n\nCompute the imaginary-time bosonic kernel with a regulator near ω=0. Machine accuracy ~eps(g) is guaranteed``\n\ng(τ0) = e^-ωτ(1+e^-ωβ) g(τ0) = e^-ωτ(1+e^ωβ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseΩ-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseΩ","text":"kernelBoseΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the bosonic kernel with Matsubara frequency.\n\ng(iω_n) = -1(iω_n-ω)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseΩ_PH-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseΩ_PH","text":"kernelBoseΩ_PH(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a correlator O(τ)O(0)_iω_n.\n\nK(iω_n) = frac2ωω^2+ω_n^2(1-e^-ωβ)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseΩ_PHA-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseΩ_PHA","text":"kernelBoseΩ_PHA(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a anormalous fermionic correlator with particle-hole symmetry.\n\nK(iω_n) = -frac2iω_nω^2+ω_n^2(1-e^-ωβ)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the fermionic Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelBoseΩ_regular-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelBoseΩ_regular","text":"kernelBoseΩ_regular(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the bosonic kernel in Matsubara frequency with a regulartor near ω=0\n\ng(iω_n) = -(1-e^-ωβ)(1+e^-ωβ)(iω_n-ω)\n\nwhere ω_n=2nπβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiT-Union{Tuple{T}, Tuple{T, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiT","text":"kernelFermiT(τ, ω, β)\n\nCompute the imaginary-time fermionic kernel.  Machine accuracy ~eps(g) is guaranteed``\n\ng(τ0) = e^-ωτ(1+e^-ωβ) g(τ0) = -e^-ωτ(1+e^ωβ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiT_PH-Union{Tuple{T}, Tuple{T, T}, Tuple{T, T, Any}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiT_PH","text":"kernelFermiT_PH(τ, ω, β)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ+e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (-β, β]\nω: frequency, ω>=0\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiT_PHA-Union{Tuple{T}, Tuple{T, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiT_PHA","text":"kernelFermiT_PHA(τ, ω, β)\n\nCompute the imaginary-time kernel for correlation function O(τ)O(0). Machine accuracy ~eps(C) is guaranteed``\n\nK(τ) = e^-ωτ-e^-ω(β-τ)\n\nArguments\n\nτ: the imaginary time, must be (0, β]\nω: frequency, ω>=0\nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiΩ-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiΩ","text":"kernelFermiΩ(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the fermionic kernel with Matsubara frequency.\n\ng(iω_n) = -1(iω_n-ω)\n\nwhere ω_n=(2n+1)πβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiΩ_PH-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiΩ_PH","text":"kernelFermiΩ_PH(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a correlator O(τ)O(0)_iω_n.\n\nK(iω_n) = -frac2iω_nω^2+ω_n^2(1+e^-ωβ)\n\nwhere ω_n=(2n+1)πβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelFermiΩ_PHA-Union{Tuple{T}, Tuple{Int64, T, T}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelFermiΩ_PHA","text":"kernelFermiΩ_PHA(n::Int, ω::T, β::T) where {T <: AbstractFloat}\n\nCompute the Matsubara-frequency kernel for a anormalous fermionic correlator with particle-hole symmetry.\n\nK(iω_n) = frac2ωω^2+ω_n^2(1+e^-ωβ)\n\nwhere ω_n=(2n+1)πβ. The convention here is consist with the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95\n\nArguments\n\nn: index of the fermionic Matsubara frequency\nω: energy \nβ: the inverse temperature \n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelT-Union{Tuple{T}, Tuple{Bool, Symbol, AbstractVector{T}, AbstractVector{T}, T}, Tuple{Bool, Symbol, AbstractVector{T}, AbstractVector{T}, T, Bool}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelT","text":"kernelT(isFermi::Bool, symmetry::Symbol, τGrid::AbstractVector{T}, ωGrid::AbstractVector{T}, β::T, regularized::Bool = false) where {T<:AbstractFloat}\n\nCompute kernel with given τ and ω grids.\n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelT-Union{Tuple{T}, Tuple{Bool, Symbol, T, T, T}, Tuple{Bool, Symbol, T, T, T, Bool}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelT","text":"kernelT(isFermi::Bool, symmetry::Symbol, τ::T, ω::T, β::T, regularized::Bool = false) where {T<:AbstractFloat}\n\nCompute the imaginary-time kernel of different type.\n\nArguments\n\nisFermi: fermionic or bosonic\nsymmetry: :ph, :pha, or :none\nτ: the imaginary time, must be (-β, β]\nω: energy \nβ: the inverse temperature \nregularized: use regularized kernel or not\n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelΩ-Union{Tuple{T}, Tuple{Bool, Symbol, Int64, T, T}, Tuple{Bool, Symbol, Int64, T, T, Bool}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelΩ","text":"kernelΩ(isFermi::Bool, symmetry::Symbol, n::Int, ω::T, β::T, regularized::Bool = false) where {T<:AbstractFloat}\n\nCompute the imaginary-time kernel of different type. Assume k_B Thbar=1\n\nArguments\n\nisFermi: fermionic or bosonic\nsymmetry: :ph, :pha, or :none\nn: index of the Matsubara frequency\nω: energy \nβ: the inverse temperature \nregularized: use regularized kernel or not\n\n\n\n\n\n","category":"method"},{"location":"lib/spectral/#Lehmann.Spectral.kernelΩ-Union{Tuple{T}, Tuple{Bool, Symbol, Vector{Int64}, Vector{T}, T}, Tuple{Bool, Symbol, Vector{Int64}, Vector{T}, T, Bool}} where T<:AbstractFloat","page":"Spectral functions","title":"Lehmann.Spectral.kernelΩ","text":"kernelΩ(isFermi::Bool, symmetry::Symbol, nGrid::Vector{Int}, ωGrid::Vector{T}, β::T) where {T<:AbstractFloat}\n\nCompute kernel matrix with given ωn (integer!) and ω grids.\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Lehmann","category":"page"},{"location":"#Lehmann.jl","page":"Home","title":"Lehmann.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for Lehmann.jl.","category":"page"},{"location":"#Discrete-Lehmann-Representation-(DLR)","page":"Home","title":"Discrete Lehmann Representation (DLR)","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides subroutines to represent and manuipulate Green's functions in the imaginary-time or in the Matsubara-frequency domain. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Imaginary-time Green's functions encode the thermodynamic properites of quantum many-body systems. At low temperature, they are typically very singular and hard to deal with in numerical calculations. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The physical Green's functions always have the analytic structure specified by the Lehmann representation,","category":"page"},{"location":"","page":"Home","title":"Home","text":"G(tau)=-int_-infty^infty K(tau omega) rho(omega) d omega","category":"page"},{"location":"","page":"Home","title":"Home","text":"where tau is the imaginary time, omega is the real frequency. While the spectral density rho(omega) depends on the details of the quantum many-body system, the convolution kernel K(tau omega) is universal and is roughly an exponential function exp(-omega tau). ","category":"page"},{"location":"","page":"Home","title":"Home","text":"If one cares about the thermodynamic quantities, one only needs to manipulate the Green's functions. Then DLR allows us to represent the Green's function up to an accuracy epsilon with a fake spectral function only has a handful poles,","category":"page"},{"location":"","page":"Home","title":"Home","text":"G(tau) approx G_mathrmDLR(tau) equiv sum_k=1^r Kleft(tau omega_kright) widehatrho_k","category":"page"},{"location":"","page":"Home","title":"Home","text":"where r is called the rank of DLR. It is of the order,","category":"page"},{"location":"","page":"Home","title":"Home","text":"r sim log fracE_uvT log frac1ϵ","category":"page"},{"location":"","page":"Home","title":"Home","text":"where T is the temperature, E_uv is the ultraviolet energy scale beyond which the physical spectral function decays away, epsilon is the accuracy.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The hallmarks of DLR are the following,","category":"page"},{"location":"","page":"Home","title":"Home","text":"In typical use cases, only dozens of coefficients are needed to represent the Green's functions up to the accuracy 1e-10.\nThe basis functions K(tau omega_i) are simple, explicit and analytic functions. It makes the Green's function manipulation (interpolation, fourier transform, convolution) rather simple in DLR.","category":"page"},{"location":"#Main-Features","page":"Home","title":"Main Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We provide the following components to ease the numerical manipulation of the Green's functions:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Algorithms to generate the discrete Lehamnn representation (DLR), which is a generic and compact representation of Green's functions proposed in the Ref. [1]. In this package, two algorithms are provided: one algorithm is based on conventional QR algorithm, another is based on a functional QR algorithm. The latter extends DLR to extremely low temperature.\nDedicated DLR for Green's functions with the particle-hole symmetry (e.g. phonon propagator) or with the particle-hole antisymmetry (e.g. superconductor gap function).\nFast and accurate Fourier transform between the imaginary-time domain and the Matsubara-frequency domain with a cost sim O(log(1T)log(1ϵ)) and an accuracy ~100ϵ.\nFast and accurate Green's function interpolation with a cost sim O(log(1T)log(1ϵ)) and an accuracy ~100ϵ.\nFit a Green's function with noisy.","category":"page"},{"location":"#Reference","page":"Home","title":"Reference","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If this library helps you to create software or publications, please let us know, and cite","category":"page"},{"location":"","page":"Home","title":"Home","text":"[1] \"Discrete Lehmann representation of imaginary time Green's functions\", Jason Kaye, Kun Chen, and Olivier Parcollet, arXiv:2107.13094","category":"page"},{"location":"","page":"Home","title":"Home","text":"[2] \"libdlr: Efficient imaginary time calculations using the discrete Lehmann representation\", Jason Kaye and Hugo U.R. Strand, arXiv:2110.06765","category":"page"},{"location":"lib/functional/#Functional-DLR-builder","page":"Functional DLR builder","title":"Functional DLR builder","text":"","category":"section"},{"location":"lib/functional/","page":"Functional DLR builder","title":"Functional DLR builder","text":"This module provides a DLR builder based on a functional QR algorithm. It can generate DLR at extremely low temperature.","category":"page"},{"location":"lib/functional/","page":"Functional DLR builder","title":"Functional DLR builder","text":"Modules = [Lehmann.Functional]","category":"page"},{"location":"lib/functional/#Lehmann.Functional.build","page":"Functional DLR builder","title":"Lehmann.Functional.build","text":"function build(dlrGrid, print::Bool = true)     Construct discrete Lehmann representation\n\n#Arguments:\n\ndlrGrid: struct that contains the information to construct the DLR grid. The following entries are required:  Λ: the dimensionless scale β*Euv, rtol: the required relative accuracy, isFermi: fermionic or bosonic, symmetry: particle-hole symmetry/antisymmetry or none\nprint: print the internal information or not\n\n\n\n\n\n","category":"function"},{"location":"lib/functional/#Lehmann.Functional.kernel-Tuple{Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.kernel","text":"(1-exp(-Λ*x)/x\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.mGramSchmidt-Tuple{Any, Any, Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.mGramSchmidt","text":"modified Gram-Schmidt process\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projKernel-Tuple{Any, Any}","page":"Functional DLR builder","title":"Lehmann.Functional.projKernel","text":"<K(gi), K(gj)>\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projPHA_τ-Tuple{Quadmath.Float128, Quadmath.Float128, Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.projPHA_τ","text":"particle-hole asymmetric kernel: K(ω, τ)=e^{-ωτ}-e^{-ω(β-τ)}\n\nKK=int_0^{Λ} dτ K(ω,t1)*K(ω2,t2)=(1-e^{t1+t2})/(t1+t2)+(1-e^{2β-t1-t2})/(2β-t1-t2)-(1-e^{β+t1-t2})/(β+t1-t2)-(1-e^{β-t1+t2})/(β-t1+t2)\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projPHA_ω-Tuple{Quadmath.Float128, Quadmath.Float128, Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.projPHA_ω","text":"particle=hole asymmetric kernel: K(ω, τ)=e^{-ωτ}-e^{-ω(β-τ)}\n\nKK=int_0^{1/2} dτ K(ω1,τ)*K(ω2,τ)=(1-e^{ω1+ω2})/(ω1+ω2)-(e^{-ω2}-e^{-ω1})/(ω1-ω2)\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projPH_τ-Tuple{Quadmath.Float128, Quadmath.Float128, Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.projPH_τ","text":"particle-hole symmetric kernel: K(ω, τ)=e^{-ωτ}+e^{-ω(β-τ)}\n\nKK=int_0^{Λ} dτ K(ω,t1)*K(ω2,t2)=(1-e^{t1+t2})/(t1+t2)+(1-e^{2β-t1-t2})/(2β-t1-t2)+(1-e^{β+t1-t2})/(β+t1-t2)+(1-e^{β-t1+t2})/(β-t1+t2)\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projPH_ω-Tuple{Quadmath.Float128, Quadmath.Float128, Quadmath.Float128}","page":"Functional DLR builder","title":"Lehmann.Functional.projPH_ω","text":"particle-hole symmetric kernel: K(ω, τ)=e^{-ωτ}+e^{-ω(β-τ)}\n\nKK=int_0^{1/2} dτ K(ω1,τ)*K(ω2,τ)=(1-e^{ω1+ω2})/(ω1+ω2)+(e^{-ω2}-e^{-ω1})/(ω1-ω2)\n\n\n\n\n\n","category":"method"},{"location":"lib/functional/#Lehmann.Functional.projqq-Tuple{Any, Vector{Quadmath.Float128}, Vector{Quadmath.Float128}}","page":"Functional DLR builder","title":"Lehmann.Functional.projqq","text":"q1=sumj cj Kj q2=sumk dk Kk return <q1, q2> = sumjk cj*dk <Kj, K_k>\n\n\n\n\n\n","category":"method"},{"location":"manual/kernel/#DLR-Kernels","page":"DLR Kernels","title":"DLR Kernels","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"The kernel in the Lehammn representation is a function that only depends on the statistics of the quantum particles, and the symmetry of the Green's function. It is universal in the sense that it doesn't depend on the microscopic details of the quantum many-body system. ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"The definition of the kernel is not unique. Here we give the defintion in this package.","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"We use the following conventions:","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Temperature T .\nInverse temperature beta= 1T.\nReal frequency omega.\nImaginary time tau.\nMatsubara frequancy iomega_n. \nFor the fermonic case, omega_n = (2n+1)pi T. \nFor the bosonic case,  omega_n = 2npi T\nFermionic Green's function is antiperiodic G(tau)=-G(beta+tau). \nBosonic one is periodic G(tau)=G(beta+tau). \nDon't confuse the periodicity with the time-reversal symmetry (a.k.a, particle-hole symmetry). \nFourier transform follows the convention in the book \"Quantum Many-particle Systems\" by J. Negele and H. Orland, Page 95,","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"G(tau) = frac1beta sum_n G(iomega_n) texte^iomega_n tau","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"G(iomega_n) = int_0^beta G(tau) texte^-iomega_n tau dtau","category":"page"},{"location":"manual/kernel/#Fermion-without-Symmetry","page":"DLR Kernels","title":"Fermion without Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = frace^-ωτ1+e^-ωβ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ iω_n) = -frac1iω_n-ω","category":"page"},{"location":"manual/kernel/#Boson-without-Symmetry","page":"DLR Kernels","title":"Boson without Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"We use a bosonic kernel with a regularator near omega =. The imaginary-time kernel happens to be the same as the fermionic kernel. The details can be found in Appendix A of this DLR paper. ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = frace^-ωτ1+e^-ωβ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency ","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ iω_n) = -frac1iω_n-ωfrac1-e^-ωβ1+e^-ωβ","category":"page"},{"location":"manual/kernel/#Fermion-with-the-Particle-hole-Symmetry","page":"DLR Kernels","title":"Fermion with the Particle-hole Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Particle-hole symmetry means the time reversal symmetry, so that G(tau)=G(beta-tau).","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = e^-ωτ+e^-ω(β-τ)","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(iω_n ω) = -frac2iω_nω^2+ω_n^2(1+e^-ωβ)","category":"page"},{"location":"manual/kernel/#Boson-with-the-Particle-hole-Symmetry","page":"DLR Kernels","title":"Boson with the Particle-hole Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Particle-hole symmetry means the time reversal symmetry, so that G(tau)=G(beta-tau).","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = e^-ωτ+e^-ω(β-τ)","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(iω_n ω) = frac2ωω^2+ω_n^2(1-e^-ωβ)","category":"page"},{"location":"manual/kernel/#Fermion-with-the-Particle-hole-Anti-Symmetry","page":"DLR Kernels","title":"Fermion with the Particle-hole Anti-Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Particle-hole antisymmetry means the time reversal symmetry, so that G(tau)=-G(beta-tau).","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = e^-ωτ-e^-ω(β-τ)","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(iω_n ω) = frac2ωω^2+ω_n^2(1+e^-ωβ)","category":"page"},{"location":"manual/kernel/#Boson-with-the-Particle-hole-Anti-Symmetry","page":"DLR Kernels","title":"Boson with the Particle-hole Anti-Symmetry","text":"","category":"section"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Particle-hole antisymmetry means the time reversal symmetry, so that G(tau)=-G(beta-tau).","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Imaginary time","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(τ ω) = e^-ωτ-e^-ω(β-τ)","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"Matusbara frequency","category":"page"},{"location":"manual/kernel/","page":"DLR Kernels","title":"DLR Kernels","text":"K(iω_n ω) = -frac2iω_nω^2+ω_n^2(1-e^-ωβ)","category":"page"}]
}
