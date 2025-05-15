import { StyleSheet, Text, View, TouchableOpacity, Share, ScrollView } from 'react-native'
import React from 'react'
import HeaderComponent from '../../Components/HeaderComponent'
import Icon from '../../Components/Icon'
import { COPY_LINK, EMAIL, REWARDS, SHARE, TELEGRAM, WHTASAPP } from '../../Components/ImageAsstes'
import { DARK_PURPLE, GOLDEN, WHITE } from '../../Components/Colors'
import Typography, { FULL_WIDTH } from '../../Components/Typography'
import { MEDIUM } from '../../Components/AppFonts'

const ReferAndEarn = ({ navigation }) => {
    const referralCode = "FRIEND25"
    const referralStats = {
        friendsJoined: 12,
        totalEarned: 240
    }

    const handleShare = async (platform) => {
        return
        const message = `Use my referral code ${referralCode} to sign up and get $10 bonus!`

        if (platform === 'copy') {
            // Handle copy to clipboard
        } else {
            try {
                await Share.share({
                    message: message,
                })
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <View style={styles.container}>

            <HeaderComponent title={'Invite & Earn'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.rewardCard}>
                    <View style={styles.giftIconContainer}>
                        <Icon source={REWARDS} size={30} tintColor={GOLDEN} />
                    </View>
                    <Typography style={styles.rewardTitle}>Earn $20 for every friend</Typography>
                    <Typography style={styles.rewardSubtitle}>Your friend gets $10 bonus too!</Typography>
                </View>

                <View style={styles.referralCodeContainer}>
                    <View style={styles.codeWrapper}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Icon source={COPY_LINK} size={20} />
                            <Typography style={styles.referralCode}>{`  ${referralCode}`}</Typography>
                        </View>
                        <TouchableOpacity style={styles.copyButton} onPress={() => handleShare('copy')}>
                            <Typography style={styles.copyButtonText}>Copy</Typography>
                        </TouchableOpacity>
                    </View>

                    {/* Share Buttons */}
                    <View style={styles.shareButtonsContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('whatsapp')}>
                                <Icon source={WHTASAPP} tintColor={WHITE} size={20} />
                            </TouchableOpacity>
                            <Typography style={styles.shareButtonText}>WhatsApp</Typography>

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('Telegram')}>
                                <Icon source={TELEGRAM} tintColor={WHITE} size={20} />
                            </TouchableOpacity>
                            <Typography style={styles.shareButtonText}>Telegram</Typography>

                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('Email')}>
                                <Icon source={EMAIL} tintColor={WHITE} size={20} />
                            </TouchableOpacity>
                            <Typography style={styles.shareButtonText}>Email</Typography>

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.shareButton} onPress={() => handleShare('More')}>
                                <Icon source={SHARE} tintColor={WHITE} size={20} />
                            </TouchableOpacity>
                            <Typography style={styles.shareButtonText}>More</Typography>

                        </View>


                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>Your Referral Stats</Text>
                    <View style={styles.statsWrapper}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{referralStats.friendsJoined}</Text>
                            <Text style={styles.statLabel}>Friends Joined</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>${referralStats.totalEarned}</Text>
                            <Text style={styles.statLabel}>Total Earned</Text>
                        </View>
                    </View>
                </View>

                {/* How it works */}
                <View style={styles.howItWorksContainer}>
                    <Text style={styles.howItWorksTitle}>How it works</Text>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <Text style={styles.stepText}>Share your referral code with friends</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <Text style={styles.stepText}>Friend signs up using your code</Text>
                    </View>
                    <View style={styles.stepContainer}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={styles.stepText}>You both get rewarded when they make their first purchase</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ReferAndEarn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },


    rewardCard: {
        backgroundColor: '#5C2D91',
        margin: 16,
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    giftIconContainer: {
        backgroundColor: WHITE,
        padding: 12,
        borderRadius: 50,
        marginBottom: 12,
    },
    rewardTitle: {
        color: WHITE,
        fontSize: 22,
        marginBottom: 8,
        fontFamily: MEDIUM
    },
    rewardSubtitle: {
        color: WHITE,
        fontSize: 16,
    },
    referralCodeContainer: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    codeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    referralCode: {
        fontSize: 16,
        fontFamily: MEDIUM
    },
    copyButton: {
        backgroundColor: DARK_PURPLE,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    copyButtonText: {
        color: WHITE,
        fontSize: 14,
        fontFamily: MEDIUM
    },
    shareButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shareButton: {
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: DARK_PURPLE,
        justifyContent: 'center'
    },
    shareButtonText: {
        fontSize: 12,
        marginTop: 4,
    },
    statsContainer: {
        borderRadius: 12,
        width: FULL_WIDTH - 40,
        alignSelf: 'center',
        padding: 10
    },
    statsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    statsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '600',
        color: '#5C2D91',
    },
    statLabel: {
        color: '#666',
        marginTop: 4,
    },
    howItWorksContainer: {
        backgroundColor: 'white',
        margin: 16,
        padding: 16,
        borderRadius: 12,
    },
    howItWorksTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    stepNumber: {
        backgroundColor: '#5C2D91',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    stepNumberText: {
        color: 'white',
        fontWeight: '600',
    },
    stepText: {
        flex: 1,
        color: '#666',
    },
})