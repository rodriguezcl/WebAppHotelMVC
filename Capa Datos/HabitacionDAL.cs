using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Datos
{
    public class HabitacionDAL:CadenaDAL
    {
        public HabitacionListCLS listarHabitacionList()
        {
            HabitacionListCLS ohabitacionListCLS = new HabitacionListCLS();
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarHabitacionListas", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        //Capturar
                        SqlDataReader drd = cmd.ExecuteReader();
                        int posIdHabitacion = drd.GetOrdinal("IIDHABITACION");
                        int posNombre = drd.GetOrdinal("NOMBRE");
                        int posPrecioPorNoche = drd.GetOrdinal("PRECIOPORNOCHE");
                        int posNumeroPersonas = drd.GetOrdinal("NUMEROPERSONAS");
                        int posTieneWifi = drd.GetOrdinal("TIENEWIFI");
                        int posTienePiscina = drd.GetOrdinal("TIENEPISCINA");
                        int posTieneVistaMar = drd.GetOrdinal("TIENEVISTAALMAR");
                        List<HabitacionCLS> listaHabitacion = new List<HabitacionCLS>();
                        HabitacionCLS oHabitacionCLS;
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                oHabitacionCLS = new HabitacionCLS();
                                oHabitacionCLS.iidhabitacion = drd.IsDBNull(posIdHabitacion) ? 0 : drd.GetInt32(posIdHabitacion);
                                oHabitacionCLS.nombre = drd.IsDBNull(posNombre) ? "" : drd.GetString(posNombre);
                                oHabitacionCLS.precionoche = drd.IsDBNull(posPrecioPorNoche) ? 0 : drd.GetDecimal(posPrecioPorNoche);
                                oHabitacionCLS.numeropersonas = drd.IsDBNull(posNumeroPersonas) ? 0 : drd.GetInt32(posNumeroPersonas);
                                oHabitacionCLS.textotienewifi = drd.IsDBNull(posTieneWifi) ? "" : drd.GetInt32(posTieneWifi)==1? "Si":"No";
                                oHabitacionCLS.textotienepiscina = drd.IsDBNull(posTienePiscina) ? "" : drd.GetInt32(posTienePiscina) == 1 ? "Si" : "No";
                                oHabitacionCLS.textotienevistaalmar = drd.IsDBNull(posTieneVistaMar) ? "" : drd.GetInt32(posTieneVistaMar) == 1 ? "Si" : "No";
                                listaHabitacion.Add(oHabitacionCLS);

                            }
                            ohabitacionListCLS.listaHabitacion = listaHabitacion;
                        }
                        if (drd.NextResult())
                        {
                            List<TipoHabitacionCLS> listaTipoHabitacion = new List<TipoHabitacionCLS>();
                            TipoHabitacionCLS oTipoHabitacionCLS = new TipoHabitacionCLS();
                            while (drd.Read())
                            {
                                oTipoHabitacionCLS = new TipoHabitacionCLS();
                                oTipoHabitacionCLS.id = drd.IsDBNull(0) ? 0 : drd.GetInt32(0);
                                oTipoHabitacionCLS.nombre = drd.IsDBNull(1) ? "" : drd.GetString(1);
                                listaTipoHabitacion.Add(oTipoHabitacionCLS);
                            }
                            ohabitacionListCLS.listaTipoHabitacion = listaTipoHabitacion;
                        }

                        if (drd.NextResult())
                        {
                            List<CamaCLS> listaCama = new List<CamaCLS>();
                            CamaCLS oCamaCLS = new CamaCLS();
                            while (drd.Read())
                            {
                                oCamaCLS = new CamaCLS();
                                oCamaCLS.idcama = drd.IsDBNull(0) ? 0 : drd.GetInt32(0);
                                oCamaCLS.nombre = drd.IsDBNull(1) ? "" : drd.GetString(1);
                                listaCama.Add(oCamaCLS);
                            }
                            ohabitacionListCLS.listaCama = listaCama;
                        }

                        if (drd.NextResult())
                        {
                            List<HotelCLS> listaHotel = new List<HotelCLS>();
                            HotelCLS oHotelCLS = new HotelCLS();
                            while (drd.Read())
                            {
                                oHotelCLS = new HotelCLS();
                                oHotelCLS.iidhotel = drd.IsDBNull(0) ? 0 : drd.GetInt32(0);
                                oHotelCLS.nombre = drd.IsDBNull(1) ? "" : drd.GetString(1);
                                listaHotel.Add(oHotelCLS);
                            }
                            ohabitacionListCLS.listaHotel = listaHotel;
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return ohabitacionListCLS;
        }
    }
}
