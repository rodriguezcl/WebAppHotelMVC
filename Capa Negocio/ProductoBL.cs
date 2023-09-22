using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
  public   class ProductoBL
    {

        public List<ProductoCLS> filtrarProductos(string nombre)
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.filtrarProductos(nombre);
        }

        public List<ProductoCLS> listarProductos()
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.listarProductos();
        }

        public ProductoMarcaCLS listarProductoMarca()
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            MarcaDAL oMarcaDAL = new MarcaDAL();
            ProductoMarcaCLS oProductoMarcaCLS = new ProductoMarcaCLS();
            oProductoMarcaCLS.listaProducto = oProductoDAL.listarProductos();
            oProductoMarcaCLS.listaMarca = oMarcaDAL.listarMarca();

            return oProductoMarcaCLS;
        }

        public List<ProductoCLS> filtrarProductoPorMarca(int iidmarca)
        {
            ProductoDAL oProductoDAL = new ProductoDAL();
            return oProductoDAL.filtrarProductoPorMarca(iidmarca);
        }


        }
}
