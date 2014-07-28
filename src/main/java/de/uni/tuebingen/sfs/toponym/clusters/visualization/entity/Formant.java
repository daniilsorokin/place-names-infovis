package de.uni.tuebingen.sfs.toponym.clusters.visualization.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlTransient;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonValue;
import org.jsefa.csv.annotation.CsvDataType;
import org.jsefa.csv.annotation.CsvField;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Entity
@Table(name = "formants")
@XmlRootElement
@CsvDataType
@NamedQueries({
    @NamedQuery(name = "Formant.findAll", query = "SELECT f FROM Formant f"),
    @NamedQuery(name = "Formant.findByFormantNo", query = "SELECT f FROM Formant f WHERE f.formantNo = :formantNo"),
    @NamedQuery(name = "Formant.findByFormantName", query = "SELECT f FROM Formant f WHERE f.formantName = :formantName")})
public class Formant implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "formant_no")
    private Integer formantNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @Column(name = "formant_name")
    @CsvField(pos = 1)
    private String formantName;
    @ManyToMany(mappedBy = "formantList")
    private List<Affix> affixList;
    @OneToMany(mappedBy = "formant")
    private List<ToponymObject> toponymObjectList;
//    @Transient
//    private List<Integer> toponymObjectIdList;
    
    protected Formant() {
    }

    public Formant(int id, String formantName) {
        this.formantNo = id;
        this.formantName = formantName;
    }

    public Integer getFormantNo() {
        return formantNo;
    }

    public void setFormantNo(Integer formantNo) {
        this.formantNo = formantNo;
    }

    public String getFormantName() {
        return formantName;
    }

    public void setFormantName(String formantName) {
        this.formantName = formantName;
    }

    @XmlTransient
    @JsonIgnore
    public List<Affix> getAffixList() {
        return affixList;
    }

    public void setAffixList(List<Affix> affixList) {
        this.affixList = affixList;
    }

    @XmlTransient
    @JsonIgnore
    public List<ToponymObject> getToponymObjectList() {
        return toponymObjectList;
    }

    public void setToponymObjectList(List<ToponymObject> toponymObjectList) {
        this.toponymObjectList = toponymObjectList;
    }
    
    @XmlElement(name = "toponymIds")
    public List<Integer> getToponymObjectIdList() {
        List<Integer> toponymObjectIdList = new ArrayList<>();
        for (ToponymObject toponymObject : toponymObjectList) {
            toponymObjectIdList.add(toponymObject.getToponymNo());
        }        
        return toponymObjectIdList;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 43 * hash + Objects.hashCode(this.formantName);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Formant other = (Formant) obj;
        if (!Objects.equals(this.formantName, other.formantName)) {
            return false;
        }
        return true;
    }

    
    
    @Override
    public String toString() {
        return "Formant[ formantNo=" + formantNo + "  name=" + formantName + " ]";
    }

}
