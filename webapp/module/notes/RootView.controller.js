
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("me.conmy.track.Acti-Track.module.notes.RootView", {
		
		onInit: function () {
			console.log("RootView onInit");
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
			this.handleOpenEditNote();
		},
		onColumnListItemDetailPress: function(oEvent) {
			// Grab the ID value from the bound model.
			var sBindingPath = oEvent.getSource().getBindingContextPath();
			var sRecord = this.oNotesModel.getContext(sBindingPath).getObject();
			
			this.handleOpenEditNote(sRecord.ID);
		},
		
		handleOpenEditNote: function(sRecordId) {
			console.log("Attempting navigation ", sRecordId);
			this.getOwnerComponent().getRouter().navTo("RouteSingleNoteView", {
				recordId: sRecordId
			});
		}
	});
});