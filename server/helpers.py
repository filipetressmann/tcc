import json
import os
import uuid

import geopandas as gpd

data_path = os.path.abspath('./') + '/uploaded_shapefiles'


def convert(files):
    id = str(uuid.uuid4())
    files['cpg'].save(data_path + '/' + id + '.cpg', buffer_size=16384)
    files['dbf'].save(data_path + '/' + id + '.dbf', buffer_size=16384)
    files['shp'].save(data_path + '/' + id + '.shp', buffer_size=16384)
    files['shx'].save(data_path + '/' + id + '.shx', buffer_size=16384)

    try:
        gdf = gpd.GeoDataFrame.from_file(
            f'{data_path}/{id}.shp', encoding='utf-8')
    except:
        os.remove(data_path + '/' + id + '.cpg')
        os.remove(data_path + '/' + id + '.dbf')
        os.remove(data_path + '/' + id + '.shp')
        os.remove(data_path + '/' + id + '.shx')
        return None

    os.remove(data_path + '/' + id + '.cpg')
    os.remove(data_path + '/' + id + '.dbf')
    os.remove(data_path + '/' + id + '.shp')
    os.remove(data_path + '/' + id + '.shx')

    gdf.crs = 'epsg:22523'
    gdf = gdf.to_crs('epsg:4326')
    return gdf.to_json()
