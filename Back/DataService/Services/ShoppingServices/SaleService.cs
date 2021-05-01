using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DataService.Data.Entities;
using DataService.Data;

namespace DataService.Services.ShoppingServices
{
    public interface ISaleService
    {
        Task<Sale> Sale(Sale sale);
    }
    public class SaleService : ISaleService
    {
        private readonly AppDbContext _context;

        public SaleService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Sale> Sale(Sale sale)
        {
            sale.AddedDate = DateTime.Now;
            await _context.Sales.AddAsync(sale);
            await _context.SaveChangesAsync();
            return sale;
            
        }
    }
}
