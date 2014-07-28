/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package de.uni.tuebingen.sfs.toponym.clusters.visualization.resources;

import org.jsefa.common.converter.SimpleTypeConverter;

/**
 *
 * @author dsorokin
 */
public class DoubleConverter implements SimpleTypeConverter {

    public static DoubleConverter create(){
        return new DoubleConverter();
    }
    
    private DoubleConverter() {
    }
    
    @Override
    public String toString(Object o) {
        return o.toString();
    }

    @Override
    public Object fromString(String string) {
        return Double.parseDouble(string);
    }
    
}
