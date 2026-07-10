namespace ControleGastos.Api.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public DateTime DataNascimento { get; set; }
    public int Idade => CalcularIdade();
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();

    private int CalcularIdade()
    {
        var hoje = DateTime.Today;
        var idade = hoje.Year - DataNascimento.Year;

        if (hoje < DataNascimento.AddYears(idade))
        {
            idade--;
        }

        return idade;
    }
}
