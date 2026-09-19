using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId { get; set; } 
        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User {get;set;}
        [Required]
        public string FeedbackText { get; set; }
        [Required]
        public DateTime Date{ get; set; }
    }
}