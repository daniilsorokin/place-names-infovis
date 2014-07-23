package de.uni.tuebingen.sfs.toponym.clusters.visualization.resources;

import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Dataset;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Stateless
@Path("dataset")
public class DatasetFacadeREST extends AbstractFacade<Dataset> {
    @PersistenceContext(unitName = "de.uni.tuebingen.sfs_toponym-clusters-visualization_war_2.0PU")
    private EntityManager em;

    public DatasetFacadeREST() {
        super(Dataset.class);
        try {
            Class.forName("org.postgresql.Driver");
            em = Persistence.createEntityManagerFactory("de.uni.tuebingen.sfs_toponym-clusters-visualization_war_2.0PU").createEntityManager();
        }  catch (ClassNotFoundException ex) {
            Logger.getLogger(DatasetFacadeREST.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    public Dataset find(@PathParam("id") Integer id) {
        return super.find(id);
    }
    
    @GET
    @Path("{id}/toponymobjects")
    @Produces({"application/xml", "application/json"})
    public List<ToponymObject> getDatasetToponyms (@PathParam("id") Integer id) {
        Dataset dataset = super.find(id);
        return dataset.getToponymObjectList();
    }
    
    @GET
    @Path("{id}/formants")
    @Produces({"application/xml", "application/json"})
    public List<Formant> getDatasetFormants (@PathParam("id") Integer id) {
        Dataset dataset = super.find(id);
        return dataset.getFormantList();
    }    

    
    @GET
    @Override
    @Produces({"application/xml", "application/json"})
    public List<Dataset> findAll() {
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
