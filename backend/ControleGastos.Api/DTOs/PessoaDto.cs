namespace ControleGastos.Api.DTOs;

public class PessoaDto
{
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
}

public class PessoaResponseDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
    public DateTime DataNascimento { get; set; }
}