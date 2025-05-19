import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CAMERA, CLOSE, GALLARY, PRIZE } from './ImageAsstes';
import { MEDIUM, SEMI_BOLD } from './AppFonts';
import Icon from './Icon';
import Typography, { FULL_WIDTH } from './Typography';
import { WHITE } from './Colors';

const ImageUploadModal = ({ visible, onClose, onImagePicked }) => {
    const openCamera = async () => {
        try {
            const images = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                multiple: false
            });
            
            onImagePicked(images);
            onClose();
        } catch (error) {
            console.log('Camera Error:', error);
            onClose();
        }
    };
    const openGallery = async () => {
        try {
            const images = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                multiple: false,
                cropping: true,
            });
            onImagePicked(images);
            onClose();
        } catch (error) {
            console.log('Gallery Error:', error);
            onClose();
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon source={CLOSE} size={25} />
                    </TouchableOpacity>

                    <Typography fontFamily={SEMI_BOLD} style={styles.title}>
                        Upload Image
                    </Typography>

                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionItem} onPress={openCamera}>
                            <Icon source={CAMERA} size={30} />
                            <Typography fontFamily={MEDIUM} style={styles.optionLabel}>
                                Camera
                            </Typography>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionItem} onPress={openGallery}>
                            <Icon source={GALLARY} size={30} />
                            <Typography fontFamily={MEDIUM} style={styles.optionLabel}>
                                Gallery
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ImageUploadModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: FULL_WIDTH - 50,
        backgroundColor: WHITE,
        padding: 10,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: -5,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    optionsContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    optionItem: {
        alignItems: 'center',
    },
    optionLabel: {
        marginVertical: 5,
    },
});
