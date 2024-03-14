import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./confirmModal.scss";

export const confirmModal = (callback) => {
	withReactContent(Swal).fire({
		title: "Удалить задачу?",
		showCancelButton: true,
		confirmButtonColor: "#d33",
		cancelButtonColor: "#aaa",
		confirmButtonText: "Удалить",
		cancelButtonText: "Отмена",
		showClass: {
			popup: 'animated fadeInDown faster'
		},
		hideClass: {
			popup: 'animated fadeOutUp faster'
		}
	}).then((response) => {
		if (response?.isConfirmed && typeof callback === "function") {
			callback();
		}
	});
}