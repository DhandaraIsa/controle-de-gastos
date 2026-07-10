using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Data;

/// <summary>
/// Representa a conexão da aplicação com o banco de dados.
///
/// O Entity Framework utiliza esta classe para descobrir quais
/// entidades deverão virar tabelas no banco.
/// </summary>
public class AppDbContext : DbContext
{
    /// <summary>
    /// Recebe as configurações do banco definidas no Program.cs.
    /// </summary>
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Representa a tabela de pessoas.
    /// </summary>
    public DbSet<Pessoa> Pessoas => Set<Pessoa>();

    /// <summary>
    /// Representa a tabela de transações.
    /// </summary>
    public DbSet<Transacao> Transacoes => Set<Transacao>();

    /// <summary>
    /// Configura relacionamentos e regras das tabelas.
    /// </summary>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Pessoa>(entity =>
        {
            entity.HasKey(pessoa => pessoa.Id);

            entity.Property(pessoa => pessoa.Nome)
                .IsRequired()
                .HasMaxLength(150);

            entity.Property(pessoa => pessoa.DataNascimento)
                .IsRequired();

            /*
             * Uma pessoa pode possuir várias transações.
             *
             * DeleteBehavior.Cascade determina que todas as transações
             * relacionadas sejam apagadas quando a pessoa for excluída.
             */
            entity.HasMany(pessoa => pessoa.Transacoes)
                .WithOne(transacao => transacao.Pessoa)
                .HasForeignKey(transacao => transacao.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Transacao>(entity =>
        {
            entity.HasKey(transacao => transacao.Id);

            entity.Property(transacao => transacao.Descricao)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(transacao => transacao.Valor)
                .HasPrecision(18, 2);

            entity.Property(transacao => transacao.Tipo)
                .IsRequired();
        });
    }
}