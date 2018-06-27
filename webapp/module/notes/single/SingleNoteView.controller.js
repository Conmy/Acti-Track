
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("me.conmy.track.Acti-Track.module.notes.single.SingleNoteView", {
		
		onInit: function () {
			console.log("SingleNoteView onInit");
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("RouteSingleNoteView").attachPatternMatched(this._onObjectMatched, this);

			var oNotesModel = new JSONModel([{
				ID: "1",
				DATE: "2018-06-27",
				NOTE: "This is a note 1"
			},
			{
				ID: "2",
				DATE: "2018-06-26",
				NOTE: "This is a note 2"
			},
			{
				ID: "3",
				DATE: "2018-06-25",
				NOTE: "This is a note 3"
			}]);
			this.getView().setModel(oNotesModel, "note");

		},
		_onObjectMatched: function (oEvent) {
			console.log("SingleNoteView _onObjectMatched: ", oEvent.getParameter("arguments").recordId);
			
			this.getView().bindObject({
				path: "/" + oEvent.getParameter("arguments").recordId,
				model: "note"
			});

			console.log(this.getView().getModel("note"));

			// console.log(this.getView().byId("frag-DateHBox").getBindingContext("note").getObject());
			// console.log(this.getView().byId("displayBox").getBindingContext("note"));
		
		},
		onAfterRendering: function () {
			// console.log("onAfterRendering called");
			// var oNoteModel = new JSONModel({
			// 	ID: "2",
			// 	DATE: "2018-06-28",
			// 	NOTE: "This is an afterRendering note"
			// });
			// this.getView().byId("RootBox").setModel(oNoteModel, "note");
		},
		onNavButtonPress: function () {
			this.getOwnerComponent().getRouter().navTo("RouteRootView");
		}
	});
});