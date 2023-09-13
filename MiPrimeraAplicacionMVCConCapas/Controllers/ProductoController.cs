using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public JsonResult lista()
        {
            ProductoBL obj = new ProductoBL();
            return Json(obj.listarProductos(), JsonRequestBehavior.AllowGet);
        }
    }
}