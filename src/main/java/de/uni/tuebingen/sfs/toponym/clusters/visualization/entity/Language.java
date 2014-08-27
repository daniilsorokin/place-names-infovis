package de.uni.tuebingen.sfs.toponym.clusters.visualization.entity;

import java.io.Serializable;
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
import org.jsefa.csv.annotation.CsvDataType;
import org.jsefa.csv.annotation.CsvField;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@Entity
@Table(name = "languages")
@CsvDataType
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Language.findAll", query = "SELECT l FROM Language l"),
    @NamedQuery(name = "Language.findByLanguageNo", query = "SELECT l FROM Language l WHERE l.languageNo = :languageNo"),
    @NamedQuery(name = "Language.findByName", query = "SELECT l FROM Language l WHERE l.name = :name"),
    @NamedQuery(name = "Language.findByNameRus", query = "SELECT l FROM Language l WHERE l.nameRus = :nameRus")})
public class Language implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "language_no")
    private Integer languageNo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 2147483647)
    @CsvField(pos = 1)
    private String name;
    @Size(max = 2147483647)
    @Column(name = "name_rus")
    private String nameRus;
    @OneToMany(mappedBy = "language")
    private List<ToponymObject> toponymObjectList;

    protected Language() {
    }

    public Language(String name) {
        this.name = name;
    }

    public Integer getLanguageNo() {
        return languageNo;
    }
    
    public void setLanguageNo(Integer languageNo) {
        this.languageNo = languageNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameRus() {
        return nameRus;
    }

    public void setNameRus(String nameRus) {
        this.nameRus = nameRus;
    }

    @XmlTransient
    @JsonIgnore
    public List<ToponymObject> getToponymObjectList() {
        return toponymObjectList;
    }

    public void setToponymObjectList(List<ToponymObject> toponymObjectList) {
        this.toponymObjectList = toponymObjectList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (languageNo != null ? languageNo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Language)) {
            return false;
        }
        Language other = (Language) object;
        if ((this.languageNo == null && other.languageNo != null) || (this.languageNo != null && !this.languageNo.equals(other.languageNo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Language[ languageNo=" + languageNo + " language=" + name + " ]";
    }

}
