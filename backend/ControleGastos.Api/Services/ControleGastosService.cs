using ControleGastos.Api.Data;
using ControleGastos.Api.DTOs;
using ControleGastos.Api.Enums;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services;

public class ControleGastosService
{
    private readonly AppDbContext _context;

    public ControleGastosService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PessoaResponseDto>> ListarPessoasAsync()
    {
        return await _context.Pessoas
            .AsNoTracking()
            .Select(p => new PessoaResponseDto
            {
                Id = p.Id,
                Nome = p.Nome,
                Idade = p.Idade,
                DataNascimento = p.DataNascimento
            })
            .ToListAsync();
    }

    public async Task<PessoaResponseDto> CadastrarPessoaAsync(PessoaDto dto)
    {
        if (dto.Idade < 0 || dto.Idade > 130)
        {
            throw new InvalidOperationException("A idade deve estar entre 0 e 130 anos.");
        }

        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            DataNascimento = DateTime.Today.AddYears(-dto.Idade)
        };

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return new PessoaResponseDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade,
            DataNascimento = pessoa.DataNascimento
        };
    }

    public async Task<bool> ExcluirPessoaAsync(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa is null)
        {
            return false;
        }

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<TransacaoResponseDto>> ListarTransacoesAsync()
    {
        return await _context.Transacoes
            .AsNoTracking()
            .Include(t => t.Pessoa)
            .Select(t => new TransacaoResponseDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                PessoaId = t.PessoaId,
                NomePessoa = t.Pessoa != null ? t.Pessoa.Nome : string.Empty
            })
            .ToListAsync();
    }

    public async Task<TransacaoResponseDto> CadastrarTransacaoAsync(TransacaoDto dto)
    {
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
        if (pessoa is null)
        {
            throw new InvalidOperationException("Pessoa não encontrada.");
        }

        if (dto.Valor <= 0)
        {
            throw new InvalidOperationException("O valor deve ser maior que zero.");
        }

        if (dto.Tipo == TipoTransacao.Despesa && pessoa.Idade < 18)
        {
            throw new InvalidOperationException("Somente pessoas maiores de 18 anos podem ter despesas.");
        }

        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return new TransacaoResponseDto
        {
            Id = transacao.Id,
            Descricao = transacao.Descricao,
            Valor = transacao.Valor,
            Tipo = transacao.Tipo,
            PessoaId = transacao.PessoaId,
            NomePessoa = pessoa.Nome
        };
    }

    public async Task<ConsultaTotaisResponseDto> ObterTotaisAsync()
    {
        var pessoas = await _context.Pessoas
            .AsNoTracking()
            .Include(p => p.Transacoes)
            .ToListAsync();

        var resumo = pessoas.Select(p =>
        {
            var totalReceitas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
            var totalDespesas = p.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

            return new PessoaResumoTotaisDto
            {
                PessoaId = p.Id,
                Nome = p.Nome,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                Saldo = totalReceitas - totalDespesas
            };
        }).ToList();

        return new ConsultaTotaisResponseDto
        {
            Pessoas = resumo,
            TotalGeral = new TotalGeralDto
            {
                TotalReceitas = resumo.Sum(x => x.TotalReceitas),
                TotalDespesas = resumo.Sum(x => x.TotalDespesas),
                SaldoLiquido = resumo.Sum(x => x.Saldo)
            }
        };
    }
}
