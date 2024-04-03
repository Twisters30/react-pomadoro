import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./confirmModal.scss";

type TOptionsModal = {
	title?: string;
	confirmButtonText?: string;
	cancelButtonText?: string,
	confirmButtonColor?: string,
	cancelButtonColor?: string,
}

export const confirmModal = (
	callback: () => void,
	options?: TOptionsModal) => {
	withReactContent(Swal).fire({
		title: options?.title || "Удалить задачу?",
		showCancelButton: true,
		confirmButtonColor: options?.confirmButtonColor || "#d33",
		cancelButtonColor: options?.cancelButtonColor || "#aaa",
		confirmButtonText: options?.confirmButtonText || "Удалить",
		cancelButtonText: options?.cancelButtonText || "Отмена",
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