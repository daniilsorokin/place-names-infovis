package de.uni.tuebingen.sfs.toponym.clusters.visualization.resources;

import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Dataset;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.Formant_;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymObject_;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymType;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.entity.ToponymType_;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.jsefa.Deserializer;
import org.jsefa.csv.CsvIOFactory;
import org.jsefa.csv.config.CsvConfiguration;

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

    @POST
    @Path("delete")
    @Consumes("text/plain")
    public Response deleteDataset(String idsAsString) {
        String[] stringIds = idsAsString.split(",");
        CriteriaBuilder cb = em.getCriteriaBuilder();
        for (String stringId : stringIds) {
            int id = Integer.parseInt(stringId);
            Dataset dataset = super.find(id);
            if (dataset == null) {
                System.err.println(idsAsString);
                return Response.serverError().build();
            }
            em.getTransaction().begin();
            
            CriteriaDelete<ToponymObject> cdt = cb.createCriteriaDelete(ToponymObject.class);
            Root<ToponymObject> roott = cdt.from(ToponymObject.class);
            cdt.where(cb.equal(roott.get(ToponymObject_.dataset), dataset));
            em.createQuery(cdt).executeUpdate();
            
            CriteriaDelete<Formant> cdf = cb.createCriteriaDelete(Formant.class);
            Root<Formant> rootf = cdf.from(Formant.class);
            cdf.where(cb.equal(rootf.get(Formant_.dataset), dataset));
            em.createQuery(cdf).executeUpdate();

            em.remove(dataset);
            em.getTransaction().commit();
            
//        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
//        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
//        Root<Formant> root = cq.from(Formant.class);
//        cq.where(cb.equal(root.get(Formant_.formantName), "ка"));
//        cq.select(root);
//        int deletedRows = getEntityManager().createQuery(cq).getResultList().size();
        }        
        return Response.ok(idsAsString).build();
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
    
    public List<Formant> findFormantByName (String name){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<Formant> root = cq.from(Formant.class);
        cq.where(cb.equal(root.get(Formant_.formantName), name));
        cq.select(root);
        return getEntityManager().createQuery(cq).getResultList();
    }
    
    private Formant getOriginal(Formant f){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<Formant> root = cq.from(Formant.class);
        cq.where(cb.and(
                cb.equal(root.get(Formant_.formantName), f.getFormantName()),
                cb.equal(root.get(Formant_.dataset), f.getDataset())
                ));
        cq.select(root);
        List<Formant> results = getEntityManager().createQuery(cq).getResultList();
        if (results.isEmpty()) return null;
        else return results.get(0);
    }
    
    private ToponymType getOriginal(ToponymType tt){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery cq = getEntityManager().getCriteriaBuilder().createQuery();
        Root<ToponymType> root = cq.from(ToponymType.class);
        cq.where(cb.equal(root.get(ToponymType_.name), tt.getName()));
        cq.select(root);
        List<ToponymType> results = getEntityManager().createQuery(cq).getResultList();
        if (results.isEmpty()) return null;
        else return results.get(0);
    }
    
    @POST
    @Path("upload/{name}/{type}")
    @Consumes("text/plain")
    public Response loadToponyms(String toponymsAsCsv, @PathParam("name") String datasetName,
            @PathParam("type") String type){
        CsvConfiguration csvConfiguration = new CsvConfiguration();
        switch(type.toLowerCase()) {
            default:
            case "csv":
                csvConfiguration.setFieldDelimiter(',');
                break;
            case "tsv":
                csvConfiguration.setFieldDelimiter('\t');
                break;
        }
        csvConfiguration.getSimpleTypeConverterProvider().registerConverterType(Double.class, DoubleConverter.class);
        Deserializer deserializer = CsvIOFactory.createFactory(csvConfiguration, ToponymObject.class).createDeserializer();
        StringReader reader = new StringReader(toponymsAsCsv);
        deserializer.open(reader);
        Dataset newDataset = new Dataset(datasetName);
        
        
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(newDataset);
        while (deserializer.hasNext()) {
            ToponymObject t = deserializer.next();
            Formant f = t.getFormant();
            Formant fo = null;
            ToponymType tto = null;
            
            if (f != null) {
                f.setDataset(newDataset);
                fo = getOriginal(f);
            }
            if (t.getType()!= null) {
                tto = getOriginal(t.getType());
            }
            if (f != null) {
                if (fo == null){
                    newDataset.addFormantToList(f);
                    em.persist(f);
                    f.addToponymObjectToList(t);
                } else {
                    t.setFormant(fo);
                    fo.addToponymObjectToList(t);
                }
            }
            if (t.getType()!= null){
                if (tto == null){
                    em.persist(t.getType());
                } else {
                    t.setType(tto);
                }
            }
            t.setDataset(newDataset);
            newDataset.addToponymObjectToList(t);
            em.persist(t);
        }
        tx.commit();
        deserializer.close(true);
        return Response.ok().build();
    }
    
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
