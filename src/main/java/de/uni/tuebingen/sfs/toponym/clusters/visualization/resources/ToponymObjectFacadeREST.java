package de.uni.tuebingen.sfs.toponym.clusters.visualization.resources;

import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject_;
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

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Stateless
@Path("toponymobject")
public class ToponymObjectFacadeREST extends AbstractFacade<ToponymObject> {
    @PersistenceContext(unitName = "de.uni.tuebingen.sfs_toponym-clusters-visualization_war_2.0PU")
    private EntityManager em;

    public ToponymObjectFacadeREST() {
        super(ToponymObject.class);
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
    public ToponymObject find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Path("set")
    @Produces({"application/xml", "application/json"})
    public List<ToponymObject> findSet(@QueryParam("id[]") List<Integer> ids) {
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<ToponymObject> root = cq.from(ToponymObject.class);
        cq.where(root.get(ToponymObject_.toponymNo).in(ids));
        cq.select(root);
        return getEntityManager().createQuery(cq).getResultList();
    }

//    @GET
//    @Path("formant")
//    @Produces({"application/xml", "application/json"})
//    public List<ToponymObject> findFormant(@QueryParam("id") Integer id) {
//        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
//        CriteriaQuery cq = cb.createQuery();
//        Root<ToponymObject> root = cq.from(ToponymObject.class);
//        cq.where(cb.equal(root.get(ToponymObject_.formant), getEntityManager().find(Formant.class, id)));
//        cq.select(root);
//        return getEntityManager().createQuery(cq).getResultList();
//    }

    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<ToponymObject> findAll() {
        return super.findAll();
    }
    
    @GET
    @Path("{id}/name")
    public String findName(@PathParam("id") Integer id) {
        return super.find(id).getEnglishTransliteration();
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
