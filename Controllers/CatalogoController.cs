using Catalogo.Models;
using Microsoft.AspNetCore.Mvc;

namespace Catalogo.Controllers
{
    public class CatalogoController : Controller
    {
        private static List<Item> _items = new()
        {
        new Item {
            Id              = 1,
            Titulo          = "Devil May Cry",
            Genero          = "Hack and Slash",
            Ano             = 2001,
            Consola         = "PlayStation 2",
            Descripcion     = "Videojuego que trata de un cazador..."
        },
        new Item
        {
            Id        = 2,
            Titulo    = "Castlevania: Symphony of the Night",
            Genero    = "Metroidvania",
            Ano       = 1997,
            Consola   = "PlayStation 2",
            Descripcion = "Videojuego que trata de un cazador..."
        },



        new Item
        {
            Id        = 3,
            Titulo    = "Stardew Valley",
            Genero    = "Simulación de granja / RPG",
            Ano       = 2016,
            Consola   = "Multiplataforma",
            Descripcion = "El jugador hereda la vieja granja de su abuelo y debe aprender a vivir de la tierra."
        },


        new Item
        {
            Id        = 4,
            Titulo    = "Avatar: Frontiers of Pandora",
            Genero    = "Acción-Aventura",
            Ano       = 2023,
            Consola   = "PC / PS5 / Xbox Series X",
            Descripcion = "Explora la Frontera Occidental y reconecta con tu herencia perdida como Na'vi."
        },


        new Item
        {
            Id        = 5,
            Titulo    =  "Minecraft",
            Genero    = "Sandbox / Supervivencia",
            Ano       = 2011,
            Consola   = "Multiplataforma",
            Descripcion = "Un mundo infinito de bloques donde puedes construir lo que imagines o sobrevivir a monstruos."
        },

        };
    


        // Lista — con filtro opcional por género
        public IActionResult Index(string? genero)
        {
            var resultado = string.IsNullOrEmpty(genero)
                ? _items
                : _items.Where(i => i.Genero == genero).ToList();
            ViewBag.Generos = _items.Select(i => i.Genero).Distinct().ToList();
            ViewBag.GeneroActual = genero;

            return View(resultado);
        }
        // Detalle
        public IActionResult Detalle(int id)
        {
            var item = _items.FirstOrDefault(i => i.Id == id);
            return item == null ? NotFound() : View(item);
        }
        // Formulario — GET
        public IActionResult Agregar()
        {
            return View();
        }
        // Formulario — POST
        [HttpPost]
        public IActionResult Agregar(Item item)
        {
            item.Id = _items.Count + 1;
            _items.Add(item);
            return RedirectToAction("Index");
        }
    }
}





