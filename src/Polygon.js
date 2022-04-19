import {EditControl} from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";
import {FeatureGroup} from 'react-leaflet';
import { useState } from 'react';

export default function Polygon(){

    const[mapLayers, setMapLayers] = useState([]);


    const _onCreate = e => {
        console.log(e);

        const{layerType, layer}=e;
        if(layerType==='polygon'){
            const{_leaflet_id}=layer;

            setMapLayers(layers=>[...layers,{id:_leaflet_id,latlngs:layer.getLatLngs()[0]}]);
        }
      }

      const _onEdited = e => {
        console.log(e);
      }
      const _onDeleted = e => {
        console.log(e);
      }

      console.log(JSON.stringify(mapLayers,0,2))



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