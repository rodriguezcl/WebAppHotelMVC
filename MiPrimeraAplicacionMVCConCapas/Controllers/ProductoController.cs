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
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult lista()
        {
            ProductoBL obj = new ProductoBL();
            return Json(obj.listarProductos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarProductoPorNombre(string nombreproducto)
        {
            ProductoBL obj = new ProductoBL();
            return Json(obj.filtrarProductos(nombreproducto),
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarProductoMarca()
        {
            ProductoBL obj = new ProductoBL();
            return Json(obj.listarProductoMarca(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarProductoPorMarca(int iidmarca)
        {
            ProductoBL obj = new ProductoBL();
            return Json(obj.filtrarProductoPorMarca(iidmarca), JsonRequestBehavior.AllowGet);
        }

    }
}