package ServerPart;

import DatabaseAccess.KingiseppDistrict;
import ProcessPart.Dataset;
import baseclasses.Tuple;
import com.google.gson.Gson;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
public class PostgresDBServlet extends HttpServlet {

    private Connection connection;
    private EntityManager em;

    public void init(ServletConfig servletConfig) throws ServletException {
        String datasetFile = servletConfig.getInitParameter("datasetFile");
        try {
            // Initialize class
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection("jdbc:postgresql://deepspace.sfs.uni-tuebingen.de:5432/agnias-sandbox", "abrskva", "germanet");
            em = Persistence.createEntityManagerFactory("VisWebProjectPU").createEntityManager();
        } catch (SQLException ex) {
            Logger.getLogger(PostgresDBServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PostgresDBServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        Object returnData = null;
        String what = request.getParameter("what");
        if (what == null) {
            return;
        }

        if (what.equals("list")) {
            List<KingiseppDistrict> kingDistr = em.createNamedQuery("KingiseppDistrict.findAll").getResultList();

            ArrayList<String> rarray = new ArrayList<String>();
            for (KingiseppDistrict k : kingDistr) {
                rarray.add(k.getName());
            }
            returnData = rarray;
        } else if (what.equals("coordinates")){
            int index = Integer.parseInt(request.getParameter("id"));
            KingiseppDistrict kd = em.find(KingiseppDistrict.class, index);
            if (kd != null) {
                returnData = new Tuple<Double, Double>(kd.getLatitude(), kd.getLongitude());
            } else {
                return;
            }
        }


        Gson gson = new Gson();
        String json = gson.toJson(returnData);
        PrintWriter out = response.getWriter();
        try {
            out.write(json);
        } finally {
            out.close();
        }
    }

    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}