namespace ControleGastos.Api.DTOs;

public class PessoaResumoTotaisDto
{
    public int PessoaId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}

public class TotalGeralDto
{
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal SaldoLiquido { get; set; }
}

public class ConsultaTotaisResponseDto
{
    public List<PessoaResumoTotaisDto> Pessoas { get; set; } = new();
    public TotalGeralDto TotalGeral { get; set; } = new();
}
