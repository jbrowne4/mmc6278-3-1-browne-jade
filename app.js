require('dotenv').config();
const express = require('express');
const app = express();
// TODO: import the getCityInfo and getJobs functions from util.js
const {getJobs, getCityInfo} = require('./util');

// TODO: Statically serve the public folder
app.use(express.static ('public'));

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
app.route('/api/city/:city').get(async (req, res) => {
    const location = req.params.city;
    
    try {
        const cityInfo = await getCityInfo(location);
        const jobs = await getJobs(location);

        console.log("cityInfo:", cityInfo);
        console.log("jobs:", jobs);

        if (!cityInfo && !jobs) {  
            return res.status(404).json({ error: "Information not found" });
        }

        res.status(200).json({ cityInfo, jobs });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = app
