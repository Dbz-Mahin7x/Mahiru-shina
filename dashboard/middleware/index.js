const { threadsData } = global.db;

function isPostMethod(req) {
	return req.method == "POST";
}

module.exports = function (checkAuthConfigDashboardOfThread) {
	return {
		// Always allow access - skip login check
		isAuthenticated(req, res, next) {
			return next();
		},

		// Always allow access - skip unauthenticated check
		unAuthenticated(req, res, next) {
			return next();
		},

		// Skip Facebook ID verification
		isVeryfiUserIDFacebook(req, res, next) {
			return next();
		},

		// Skip waitVerifyAccount check
		isWaitVerifyAccount(req, res, next) {
			return next();
		},

		async checkHasAndInThread(req, res, next) {
			const userID = req.user?.facebookUserID;
			const threadID = isPostMethod(req) ? req.body.threadID : req.params.threadID;
			const threadData = await threadsData.get(threadID);

			if (!threadData) {
				if (isPostMethod(req))
					return res.status(401).send({
						status: "error",
						error: "PERMISSION_DENIED",
						message: "Không tìm thấy nhóm này"
					});

				req.flash("errors", { msg: "Thread not found" });
				return res.redirect("/dashboard");
			}

			const findMember = threadData.members.find(m => m.userID == userID && m.inGroup === true);
			if (!findMember) {
				if (isPostMethod(req))
					return res.status(401).send({
						status: "error",
						error: "PERMISSION_DENIED",
						message: "Bạn không phải là thành viên nhóm này"
					});

				req.flash("errors", { msg: "Bạn không ở trong nhóm chat này" });
				return res.redirect("/dashboard");
			}
			req.threadData = threadData;
			next();
		},

		async middlewareCheckAuthConfigDashboardOfThread(req, res, next) {
			const threadID = isPostMethod(req) ? req.body.threadID : req.params.threadID;
			if (checkAuthConfigDashboardOfThread(threadID, req.user?.facebookUserID))
				return next();

			if (isPostMethod(req))
				return res.status(401).send({
					status: "error",
					error: "PERMISSION_DENIED",
					message: "Bạn không có quyền chỉnh sửa nhóm này"
				});

			req.flash("errors", {
				msg: "[!] Chỉ quản trị viên của nhóm chat hoặc những thành viên được cho phép mới có thể chỉnh sửa dashboard"
			});
			return res.redirect("/dashboard");
		},

		async isAdmin(req, res, next) {
			const userID = req.user?.facebookUserID;
			if (!global.GoatBot.config.adminBot.includes(userID)) {
				if (isPostMethod(req))
					return res.status(401).send({
						status: "error",
						error: "PERMISSION_DENIED",
						message: "Bạn không phải là admin của bot"
					});

				req.flash("errors", { msg: "Bạn không phải là admin của bot" });
				return res.redirect("/dashboard");
			}
			next();
		}
	};
};
