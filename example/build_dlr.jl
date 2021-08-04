using Lehmann
using Printf

# rtol = [-4, -6, -8, -10, -12]
# Λ = [100, 1000, 10000, 100000, 1000000]
rtol = [-10]
Λ = [1000000]

for lambda in Λ
    for err in rtol
        # dlr = DLR.dlr(:fermi, lambda, 10.0^err)
        dlr = DLR.dlr(:acorr, lambda, 10.0^err)
        filename = "basis/dlr$(lambda)_1e$err.dlr"
        open(filename, "w") do io
            for r in 1:length(dlr[:ω])
                @printf(io, "%5i  %32.17g  %32.17g  %8i\n", r, dlr[:ω][r], dlr[:τ][r], dlr[:ωn][r])
            end
        end
    end
end
