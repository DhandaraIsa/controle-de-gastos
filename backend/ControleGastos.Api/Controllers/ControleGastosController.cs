using ControleGastos.Api.DTOs;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers;

[ApiController]
[Route("api")]
public class ControleGastosController : ControllerBase
{
    private readonly ControleGastosService _service;

    public ControleGastosController(ControleGastosService service)
    {
        _service = service;
    }

    [HttpGet("pessoas")]
    public async Task<ActionResult<List<PessoaResponseDto>>> ListarPessoas()
    {
        var pessoas = await _service.ListarPessoasAsync();
        return Ok(pessoas);
    }

    [HttpPost("pessoas")]
    public async Task<ActionResult<PessoaResponseDto>> CadastrarPessoa([FromBody] PessoaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome))
        {
            return BadRequest("O nome é obrigatório.");
        }

        var pessoa = await _service.CadastrarPessoaAsync(dto);
        return CreatedAtAction(nameof(ListarPessoas), new { id = pessoa.Id }, pessoa);
    }

    [HttpDelete("pessoas/{id:int}")]
    public async Task<ActionResult> ExcluirPessoa(int id)
    {
        var removido = await _service.ExcluirPessoaAsync(id);
        if (!removido)
        {
            return NotFound("Pessoa não encontrada.");
        }

        return NoContent();
    }

    [HttpGet("transacoes")]
    public async Task<ActionResult<List<TransacaoResponseDto>>> ListarTransacoes()
    {
        var transacoes = await _service.ListarTransacoesAsync();
        return Ok(transacoes);
    }

    [HttpPost("transacoes")]
    public async Task<ActionResult<TransacaoResponseDto>> CadastrarTransacao([FromBody] TransacaoDto dto)
    {
        try
        {
            var transacao = await _service.CadastrarTransacaoAsync(dto);
            return CreatedAtAction(nameof(ListarTransacoes), new { id = transacao.Id }, transacao);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("totais")]
    public async Task<ActionResult<ConsultaTotaisResponseDto>> ConsultarTotais()
    {
        var totais = await _service.ObterTotaisAsync();
        return Ok(totais);
    }
}
