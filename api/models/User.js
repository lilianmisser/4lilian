const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
	id: ObjectId,
username: {type : String, match: /[\w\d]{3,20}/, unique: true},
	password: String,
});
