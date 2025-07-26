namespace Facturas.Server.Models
{
    public class Factura
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Total { get; set; }
    }
}
