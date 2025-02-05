import React, { useState, useEffect } from "react";
import "./regions.scss";

// IMAGES
import locationIcon from "../../assets/svg/location.svg";

const RegionSelector = ({ onSelect, gender }) => {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [selectedGender, setGender] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  useEffect(() => {
    // Viloyatlar ma'lumotlarini olish
    fetch(
      "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json"
    )
      .then((response) => response.json())
      .then((data) => setRegions(data))
      .catch((error) => console.error("Error fetching regions:", error));

    // Tumanlar ma'lumotlarini olish
    fetch(
      "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json"
    )
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));

    // Qishloqlar ma'lumotlarini olish
    fetch(
      "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/villages.json"
    )
      .then((response) => response.json())
      .then((data) => setVillages(data))
      .catch((error) => console.error("Error fetching villages:", error));
  }, []);

  const handleRegionChange = (e) => {
    const regionId = e.target.value;
    const selectedRegionName =
      regions.find((region) => region.id === regionId)?.name_uz || "";
    setSelectedRegion(regionId);
    setSelectedDistrict("");
    setSelectedVillage("");
    onSelect({ region: selectedRegionName, district: "", village: "" });
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const selectedDistrictName =
      districts.find((district) => district.id === districtId)?.name_uz || "";
    setSelectedDistrict(districtId);
    setSelectedVillage("");
    onSelect({
      region:
        regions.find((region) => region.id === selectedRegion)?.name_uz || "",
      district: selectedDistrictName,
      village: "",
    });
  };

  const handleVillageChange = (e) => {
    const villageId = e.target.value;
    const selectedVillageName =
      villages.find((village) => village.id === villageId)?.name_uz || "";
    setSelectedVillage(villageId);
    onSelect({
      region:
        regions.find((region) => region.id === selectedRegion)?.name || "",
      district:
        districts.find((district) => district.id === selectedDistrict)
          ?.name_uz || "",
      village: selectedVillageName,
    });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    onSelect({
      region:
        regions.find((region) => region.id === selectedRegion)?.name || "",
      district:
        districts.find((district) => district.id === selectedDistrict)
          ?.name_uz || "",
      gender: e.target.value
    });
  };

  const filteredDistricts = districts.filter(
    (district) => district.region_id === selectedRegion
  );
  const filteredVillages = villages.filter(
    (village) => village.district_id === selectedDistrict
  );

  return (
    <div id="regions-component">
      {/* Viloyatni tanlash */}
      <div className="input-row">
        <label htmlFor="region">Viloyat:</label>

        <div className="input-and-icon">
        <img src={locationIcon} alt="" />

          <select
            id="region"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="">Viloyatni tanlang</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name_uz.replace(/�/g, "'")}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Tumanlarni tanlash */}
      <div className="input-row">
        <label htmlFor="district">Tuman:</label>
        <div className="input-and-icon">
        <img src={locationIcon} alt="" />

          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            <option value="">Tumannni tanlang</option>
            {filteredDistricts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name_uz.replace(/�/g, "'")}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Qishloqlarni tanlash */}
      { gender ? <div className="input-row">
        <label htmlFor="village">Jinsi:</label>
        <div className="input-and-icon">
            <img src={locationIcon} alt="" />
          <select
            id="village"
            value={selectedGender}
            onChange={handleGenderChange}
          >
              <option key={ 'male' } value={ 'male' }>Erkak</option>
              <option key={ 'female' } value={ 'female' }>Ayol</option>
          </select>
        </div>
      </div> : <div className="input-row">
        <label htmlFor="village">Mahalla:</label>
        <div className="input-and-icon">
            <img src={locationIcon} alt="" />
          <select
            id="village"
            value={selectedVillage}
            onChange={handleVillageChange}
          >
            <option value="">Mahallani tanlang</option>
            {filteredVillages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.name_uz.replace(/�/g, "'")}
              </option>
            ))}
          </select>
        </div>
      </div> }
      
    </div>
  );
};

export default RegionSelector;
