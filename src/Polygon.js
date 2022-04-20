import {EditControl} from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";
import {FeatureGroup} from 'react-leaflet';
import { useState } from 'react';


export default function Polygon(){

    // const[mapLayers, setMapLayers] = useState([]);
    const[_, setMapLayers] = useState([]);
    
    const _onCreate = e => {
        // console.log(e);

        const{layerType, layer}=e;
        if(layerType==='polygon'){
            const{_leaflet_id}=layer;
            setMapLayers(layers=>[...layers,{id:_leaflet_id,latlngs:layer.getLatLngs()[0]}
        ]);    
        }
      }
    
      const _onEdited = e => {
        // console.log(e);
        const {
            layers:{_layers},
        } = e;

        Object.values(_layers).map(({_leaflet_id, editing}) => {
            setMapLayers((layers) => 
            layers.map((l) =>
            l.id === _leaflet_id 
            ? { ...l, latlngs:{...editing.latlngs[0] } } 
            : l
            )
            );
        });
      }

      const _onDeleted = e => {
        // console.log(e);
        const {
            layers:{_layers},
        } = e;

        Object.values(_layers).map(({_leaflet_id}) => {
            setMapLayers((layers) => layers.filter((l)=>l.id !== _leaflet_id));
        });
      };

    //   console.log(JSON.stringify(mapLayers,0,2))
    //   const points = mapLayers[0].latlngs;
    //   console.log({points});
    //   const pointsLength = points.length;
    //   const polygon = [];
    //   for(let i = 0; i < pointsLength; i++) {
    //     const point = points[i];
    //     polygon.push([point.lng, point.lat]);
    //   }
    //   polygon.push([points[0].lng, points[0].lat]);
    //   const data = [polygon];
    //   console.log({data})

    return (
        <FeatureGroup>
        <EditControl 
          position="topleft" 
          onCreated={_onCreate} 
          onEdited={_onEdited} 
          onDeleted={_onDeleted} 
          draw={{
            rectangle: false,
            polyline: false,
            circle:false,
            circlemarker: false,
            marker:false
        }}
        />
      </FeatureGroup>
      
    )
   
}
