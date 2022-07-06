import os
import shutil
import uuid
from zipfile import ZipFile

import fiona
import geopandas as gpd

# enable KML support
fiona.drvsupport.supported_drivers['kml'] = 'rw'
fiona.drvsupport.supported_drivers['KML'] = 'rw'

data_path = os.path.abspath('./') + '/uploaded_shapefiles'


def mkdir(dirPath):
    if not os.path.exists(dirPath):
        os.makedirs(dirPath)


def rmdir(dirPath):
    if os.path.exists(dirPath):
        shutil.rmtree(dirPath)


def convert_shapefile_to_geojson(files):
    id = str(uuid.uuid4())
    filePath = data_path + '/' + id
    mkdir(filePath)

    files['cpg'].save(filePath + '/tmp.cpg', buffer_size=16384)
    files['dbf'].save(filePath + '/tmp.dbf', buffer_size=16384)
    files['shp'].save(filePath + '/tmp.shp', buffer_size=16384)
    files['shx'].save(filePath + '/tmp.shx', buffer_size=16384)

    try:
        gdf = gpd.GeoDataFrame.from_file(
            f'{filePath}/tmp.shp', encoding='utf-8')
    except:
        rmdir(filePath)
        return None

    rmdir(filePath)

    gdf.crs = 'epsg:22523'
    gdf = gdf.to_crs('epsg:4326')
    return gdf.to_json()


def convert_shapefile_zip_to_geojson(files):
    id = str(uuid.uuid4())
    filePath = data_path + '/' + id
    mkdir(filePath)

    files['zip'].save(filePath + '/tmp.zip', buffer_size=16384)

    dirPath = extractShpZip(id)

    try:
        gdf = gpd.GeoDataFrame.from_file(
            f'{dirPath}/tmp.shp', encoding='utf-8')
    except:
        rmdir(filePath)
        return None

    rmdir(filePath)

    gdf.crs = 'epsg:22523'
    gdf = gdf.to_crs('epsg:4326')
    return gdf.to_json()


def convert_kmz_to_geojson(files):
    id = str(uuid.uuid4())
    filePath = data_path + '/' + id
    mkdir(filePath)

    files['kmz'].save(filePath + '/tmp.kmz', buffer_size=16384)
    extractKmzToKml(id)

    try:
        gdf = gpd.GeoDataFrame.from_file(
            f'{filePath}/doc.kml', encoding='utf-8')
    except:
        rmdir(filePath)
        return None

    rmdir(filePath)

    gdf.crs = 'epsg:22523'
    gdf = gdf.to_crs('epsg:4326')
    return gdf.to_json()


def extractKmzToKml(id):
    dirPath = data_path + '/' + id
    filePath = dirPath + '/tmp.kmz'
    kmz = ZipFile(filePath, 'r')
    kmz.extract('doc.kml', dirPath)


def extractShpZip(id):
    dirPath = data_path + '/' + id
    filePath = dirPath + '/tmp.zip'
    files = ZipFile(filePath, 'r')
    files.extractall(dirPath)
    os.remove(filePath)
    listDir = os.listdir(dirPath)

    # Checks if unzipped files contains a directory
    if len(listDir) == 1:
        dirPath += '/' + listDir[0]
        listDir = os.listdir(dirPath)

    for fileName in listDir:
        extension = fileName[-3:]
        os.rename(dirPath + '/' + fileName, dirPath + '/tmp.' + extension)

    return dirPath
