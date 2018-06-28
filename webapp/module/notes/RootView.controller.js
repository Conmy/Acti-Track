
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("me.conmy.track.Acti-Track.module.notes.RootView", {
		
		onInit: function () {
			console.log("RootView onInit");

			this.oModeModel = this.getOwnerComponent().getModel("mode");
			this.oModeModel.setData({
				MODE: 'display'
			});
			this.oNotesModel = this.getOwnerComponent().getModel("notes");
			this.oNotesModel.setData([{
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
		},
		onAfterRendering: function () {
			console.log("RootView onAfterRendering");
		},
		onNewButtonPressed: function (oEvent) {
			console.log("onNewButtonPressed");
		},
		onEditButtonPressed: function (oEvent) {
			console.log("onEditButtonPressed");
			this.oModeModel.setData({
				MODE: 'edit'
			});
		},
		onCancelButtonPressed: function(oEvent) {
			console.log("onCancelButtonPressed");
			this.oModeModel.setData({
				MODE: 'display'
			});
		},
		onColumnListItemPress: function(oEvent) {
			console.log("ListItemPressed");
			// Grab the ID value from the bound model.
			var sBindingPath = oEvent.getSource().getBindingContextPath();
			this.getView().byId("detailNotesPage").bindElement({
				path: sBindingPath,
				model: "notes"
			});
			this.byId("idAppControl").toDetail("detailNotesPage");
		},
		
		handleOpenEditNote: function(sRecordId) {
			console.log("Attempting navigation ", sRecordId);
			this.getOwnerComponent().getRouter().navTo("RouteSingleNoteView", {
				recordId: sRecordId
			});
		}
	});
});