package de.uni.tuebingen.sfs.toponym.clusters.visualization.services;

import com.google.common.collect.ImmutableSet;
import de.uni.tuebingen.sfs.toponym.clusters.visualization.resources.*;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 *
 * @author Daniil Sorokin <daniil.sorokin@uni-tuebingen.de>
 */
@ApplicationPath("request")
public class ToponymVisualizationDataRequestsService extends Application {
    private ImmutableSet<Object> singletons = ImmutableSet.<Object>of(
                                                                new ToponymObjectFacadeREST(),
                                                                new FormantFacadeREST(),
                                                                new DatasetFacadeREST());
    
    @Override
    public Set<Object> getSingletons (){
        return singletons;
    }
}
