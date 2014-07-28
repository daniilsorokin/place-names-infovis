package de.uni.tuebingen.sfs.toponym.clusters.visualization.resources;

import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant_;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import org.codehaus.jettison.json.JSONArray;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Stateless
@Path("formant")
public class FormantFacadeREST extends AbstractFacade<Formant> {
    @PersistenceContext(unitName = "de.uni.tuebingen.sfs_toponym-clusters-visualization_war_2.0PU")
    private EntityManager em;

    public FormantFacadeREST() {
        super(Formant.class);
        try {
            Class.forName("org.postgresql.Driver");
            em = Persistence.createEntityManagerFactory("de.uni.tuebingen.sfs_toponym-clusters-visualization_war_2.0PU").createEntityManager();
        }  catch (ClassNotFoundException ex) {
            Logger.getLogger(ToponymObjectFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Formant find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    public List<Formant> findByName (String name){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<Formant> root = cq.from(Formant.class);
        cq.where(cb.equal(root.get(Formant_.formantName), name));
        cq.select(root);
        return getEntityManager().createQuery(cq).getResultList();
    }

    @GET
    @Path("{id}/toponyms")
    @Produces({"application/xml", "application/json"})
    public List<ToponymObject> findToponyms(@PathParam("id") Integer id) {
        Formant formant = super.find(id);
        return formant.getToponymObjectList();
    }

    @GET
    @Path("{id}/toponyms/ids")
    @Produces("application/json")
    public JSONArray findToponymIds(@PathParam("id") Integer id) {
        Formant formant = super.find(id);
        List<Integer> ids = new ArrayList<>();
        for (ToponymObject toponymObject : formant.getToponymObjectList()) {
            ids.add(toponymObject.getToponymNo());
        }
        return new JSONArray(ids);
    }
    
    @GET
    @Path("set")
    @Produces({"application/xml", "application/json"})
    public List<Formant> findSet(@QueryParam("id[]") List<Integer> ids) {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<Formant> root = cq.from(Formant.class);
        cq.where(root.get(Formant_.formantNo).in(ids));
        cq.select(root);
        return getEntityManager().createQuery(cq).getResultList();
    }    

    
    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Formant> findAll() {
        return super.findAll();
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
