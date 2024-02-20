/** @format */

import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import React, {
	forwardRef,
	ForwardRefRenderFunction,
	memo,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';

interface AppBottomSheetModalProps extends Partial<BottomSheetModalProps> {
	children: React.ReactNode;
	open?: boolean;
}

type BottomSheetPresentHandle = {
	present: () => void;
	dismiss: () => void;
};

const BottomSheetModalWithBackDrop: ForwardRefRenderFunction<
	BottomSheetPresentHandle,
	AppBottomSheetModalProps
> = (
	{ snapPoints = [400], index = 0, onChange, children, open, ...otherProps },
	ref
) => {
	const buttonSheetModalRef = useRef<BottomSheetModal>(null);

	useEffect(() => {
		if (open === true) {
			buttonSheetModalRef.current?.present();
		} else if (open === false) {
			// Will only close if open is provided with bool type
			buttonSheetModalRef.current?.dismiss();
		}
	}, [open]);

	useImperativeHandle(ref, () => ({
		present: () => buttonSheetModalRef.current?.present(),
		dismiss: () => buttonSheetModalRef.current?.dismiss(),
	}));
	return (
		<BottomSheetModal
			snapPoints={snapPoints}
			index={index}
			ref={buttonSheetModalRef}
			onChange={onChange}
			backdropComponent={(props: any) => (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
			{...otherProps}>
			{children}
		</BottomSheetModal>
	);
};

export default memo(forwardRef(BottomSheetModalWithBackDrop));
