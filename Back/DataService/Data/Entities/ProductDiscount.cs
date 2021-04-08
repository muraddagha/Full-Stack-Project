using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
    public class ProductDiscount:BaseEntity
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int DiscountId { get; set; }

        public Product Product { get; set; }
        public Discount Discount { get; set; }
    }
}
