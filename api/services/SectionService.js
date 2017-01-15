var SectionService = module.exports = {};

/**
 * Remove section
 * @param sectionId
 * @param cb
 */
SectionService.deleteSection = function (sectionId, cb) {
	var deleteSection = function (aCb) {
		var sql = 'DELETE FROM section WHERE id=?';
		Model.query(sql, [sectionId], aCb);
	}

	//TODO: Need to do some actions here for another tables
	async.auto({
		deleteSection: deleteSection
	}, function (err) {
		if (err) {
			return cb(err);
		}
		cb(null, {
			message: 'Success'
		})
	})
}