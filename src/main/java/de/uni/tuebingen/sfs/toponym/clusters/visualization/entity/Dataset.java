package de.uni.tuebingen.sfs.toponym.clusters.visualization.entity;

import de.uni.tuebingen.sfs.toponym.clusters.visualization.resources.DatasetFacadeREST;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Entity
@Table(name = "datasets")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Dataset.findAll", query = "SELECT d FROM Dataset d"),
    @NamedQuery(name = "Dataset.findByDatasetNo", query = "SELECT d FROM Dataset d WHERE d.datasetNo = :datasetNo"),
    @NamedQuery(name = "Dataset.findByName", query = "SELECT d FROM Dataset d WHERE d.name = :name"),
    @NamedQuery(name = "Dataset.findByInfo", query = "SELECT d FROM Dataset d WHERE d.info = :info")})
public class Dataset implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "dataset_no")
    private Integer datasetNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    private String name;
    @Size(max = 2147483647)
    private String info;
    @OneToMany(mappedBy = "dataset")
    private List<ToponymObject> toponymObjectList;
    @OneToMany(mappedBy = "dataset")
    private List<Formant> formantList;

    protected Dataset() {
    }

    public Dataset(int id, String name) {
        this.datasetNo = id;
        this.name = name;
    }
    
    public Dataset(String name) {
        this.name = name;
    }    

    public Integer getDatasetNo() {
        return datasetNo;
    }

    public void setDatasetNo(Integer datasetNo) {
        this.datasetNo = datasetNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @XmlTransient
    @JsonIgnore
    public List<ToponymObject> getToponymObjectList() {
        return toponymObjectList;
    }

    public void setToponymObjectList(List<ToponymObject> toponymObjectList) {
        this.toponymObjectList = toponymObjectList;
    }
    
    @XmlTransient
    @JsonIgnore
    public List<Formant> getFormantList() {
        return formantList;
    }

    public void setFormantList(List<Formant> formantList) {
        this.formantList = formantList;
    }    
    
    public void addToponymObjectToList(ToponymObject t){
        if (this.toponymObjectList == null)
            this.toponymObjectList = new ArrayList<>();
        this.toponymObjectList.add(t);
    }

    public void addFormantToList(Formant f){
        if (this.formantList == null)
            this.formantList = new ArrayList<>();
        this.formantList.add(f);
    }
    
    @Deprecated
    public List<Formant> getFormantList2() {
        List<ToponymObject> toponymObjects = getToponymObjectList();
        HashSet<Formant> formants = new HashSet<>();
        for (ToponymObject toponymObject : toponymObjects) {
            Formant formant = toponymObject.getFormant();
            if (formant != null) formants.add(formant);
        }
        return new ArrayList<>(formants);
    }    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (datasetNo != null ? datasetNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Dataset)) {
            return false;
        }
        Dataset other = (Dataset) object;
        if ((this.datasetNo == null && other.datasetNo != null) || (this.datasetNo != null && !this.datasetNo.equals(other.datasetNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Dataset[ datasetNo=" + datasetNo + "  name=" + name + " ]";
    }

}
