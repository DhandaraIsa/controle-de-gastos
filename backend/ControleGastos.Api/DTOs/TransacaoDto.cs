using ControleGastos.Api.Enums;

namespace ControleGastos.Api.DTOs;

public class TransacaoDto
{
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int PessoaId { get; set; }
}

public class TransacaoResponseDto
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int PessoaId { get; set; }
    public string NomePessoa { get; set; } = string.Empty;
}