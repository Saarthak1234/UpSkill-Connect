class PeerService {
  private peer: RTCPeerConnection;

  constructor() {
    this.peer = new RTCPeerConnection();
  }

  public getPeerInstance(): RTCPeerConnection {
    return this.peer;
  }

  async getOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    await this.peer.setRemoteDescription(offer);
    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);
    return answer;
  }

  async setLocalDescription(answer: RTCSessionDescriptionInit) {
    await this.peer.setRemoteDescription(answer);
  }
}

const peer = new PeerService();
export default peer;
