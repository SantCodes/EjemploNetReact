using Facturas.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;

namespace Facturas.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturasController : ControllerBase
    {
        [HttpGet(Name ="GetFacturas")]
        public IEnumerable<Factura> Get()
        {
            return new List<Factura>() { 
                new Factura
                {
                    Id = 1,
                    Name = "Test",
                    Description = "Test",
                    Total = 1000,
                }
            };

        }
    }


public static class FacturaEndpoints
{
	public static void MapFacturaEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Factura").WithTags(nameof(Factura));
            var facturas = new List<Factura>();
        group.MapGet("/", () =>
        {
            return facturas;
        })
        .WithName("GetAllFacturas")
        .WithOpenApi();

        group.MapGet("/{id}", (int id) =>
        {
            //return new Factura { ID = id };
        })
        .WithName("GetFacturaById")
        .WithOpenApi();

        group.MapPut("/{id}", (int id, Factura input) =>
        {
            return TypedResults.NoContent();
        })
        .WithName("UpdateFactura")
        .WithOpenApi();

        group.MapPost("/", (Factura model) =>
        {
            facturas.Add(model);
            return facturas;
            //return TypedResults.Created($"/api/Facturas/{model.ID}", model);
        })
        .WithName("CreateFactura")
        .WithOpenApi();

        group.MapDelete("/{id}", (int id) =>
        {
            var factura1 = facturas.First(factura => factura.Id == id);
            facturas.Remove(factura1);
            return facturas;
        })
        .WithName("DeleteFactura")
        .WithOpenApi();
    }
}}
