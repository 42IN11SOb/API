var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seasonColorSchema = new Schema({
    _season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
    _color: {
        type: Schema.Types.ObjectId,
        ref: 'Color'
    }
});

var SeasonColor = mongoose.model('SeasonColor', seasonColorSchema);
