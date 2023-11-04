const mongoose = require('mongoose');

const disasterResponseFundSchema = new mongoose.Schema({
    title: String,
    desc: String,
    created_date: String,
    source: String,
    org_type: String,
    records: [{
        sl_no_: String,
        state: String,
        allocation_of_sdrf___central_share: Number,
        allocation_of_sdrf___state_share: Number,
        allocation_of_sdrf___total: Number,
        release_from_sdrf___1st_installment: Number,
        release_from_sdrf___2nd_installment: Number,
    }]
});

module.exports = mongoose.model('DisasterResponseFund', disasterResponseFundSchema);
