using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace DataService.Data.Entities
{
   public abstract class BaseEntity
    {
        public int Id { get; set; }

        public bool SoftDeleted { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        [MaxLength(50)]
        public string AddedBy { get; set; }

        [MaxLength(50)]
        public string ModifiedBy { get; set; }
    }
}
