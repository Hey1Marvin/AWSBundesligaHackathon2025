import { Platform, Alert, ToastAndroid } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Share } from 'react-native';

export class ShareService {
  private static _message: string = '';

  static setMessage(message: string) {
    this._message = message;
    this.prepareWebEnvironment();
  }

  private static prepareWebEnvironment() {
    if (Platform.OS === 'web') {
      document.documentElement.dataset.shareMessage = encodeURIComponent(this._message);
    }
  }

  static async share(): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        await this.handleWebShare();
      } else {
        await Share.share({
          message: this._message,
          title: 'Nachricht teilen'
        });
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private static async handleWebShare(): Promise<void> {
    try {
      if (this.isWebShareSupported()) {
        await navigator.share({
          title: 'Chat-Nachricht',
          text: this._message,
          url: this.getShareUrl()
        });
      } else {
        await this.showWebFallback();
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      throw error;
    }
  }

  private static isWebShareSupported(): boolean {
    return (
      Platform.OS === 'web' && 
      typeof navigator.share === 'function' &&
      navigator.canShare?.({ text: this._message })
    );
  }

  private static getShareUrl(): string {
    return window.location.href.split('?')[0] + '?shared=' + encodeURIComponent(this._message);
  }

  private static async showWebFallback(): Promise<void> {
    const copySuccess = await this.copyToClipboard();
    
    if (copySuccess) {
      this.showFeedback('✓ In Zwischenablage kopiert');
    } else {
      await this.showManualCopyDialog();
    }
  }

  private static async copyToClipboard(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(this._message);
        return true;
      }
      await Clipboard.setStringAsync(this._message);
      return true;
    } catch (error) {
      return false;
    }
  }

  private static async showManualCopyDialog(): Promise<void> {
    return new Promise((resolve) => {
      if (Platform.OS === 'web') {
        // Web Implementierung
      } else {
        Alert.alert(
          'Teilen',
          this._message,
          [
            { 
              text: 'OK', 
              onPress: () => resolve() 
            },
            { 
              text: 'Abbrechen', 
              onPress: () => {
                this.handleCancel();
                resolve();
              }
            }
          ]
        );
      }
    });
  }

  

  private static showFeedback(message: string): void {
    if (Platform.OS === 'web') {
      const feedback = document.createElement('div');
      feedback.textContent = message;
      Object.assign(feedback.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        background: '#4CAF50',
        color: 'white',
        borderRadius: '4px',
        zIndex: 1000
      });
      document.body.appendChild(feedback);
      setTimeout(() => feedback.remove(), 2000);
    } else if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  }

  private static handleError(error: unknown): void {
    const errorMessage = this.getErrorMessage(error);
    
    if (errorMessage.toLowerCase().includes('aborted')) return;

    Alert.alert(
      'Fehler beim Teilen',
      `${errorMessage}\n\nSie können den Text manuell kopieren:\n\n${this._message}`
    );
  }

  private static getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Unbekannter Fehler beim Teilen';
  }

  private static handleCancel(): void {
    console.log('Share action cancelled by user');
  }
}